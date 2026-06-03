$(document).ready(function () {
	$('#image_1').on('change', async function (e) {
		$('#image-1-preview').prop('src', '')
		var input = $(this)[0]
		if (input.files && input.files[0]) {
			var file = input.files[0];
			var fileName = file.name;
			var extension = fileName.substring(fileName.lastIndexOf('.') + 1).toLowerCase();

			if (
				extension == 'jpeg' ||
				extension == 'jpg' ||
				extension == 'png'
			) {
				try {
					// Compress file using commonJs function with default options
					var compressedFile = await compressImageFile(file);

					// Store the compressed file back in input
					const dataTransfer = new DataTransfer();
					dataTransfer.items.add(compressedFile);
					input.files = dataTransfer.files;

					// Update label
					$(this)
						.siblings('.custom-file-label')
						.addClass('selected')
						.html(compressedFile.name);

					// Show preview
					var reader = new FileReader();
					reader.onload = function (e) {
						$('#image-1-preview').prop('src', e.target.result);
					};
					reader.readAsDataURL(compressedFile);
				} catch (err) {
					console.error("Compression error:", err);
					alertjs.warning({ t: "त्रुटी", m: "फोटो कॉम्प्रेस करताना त्रुटी आली." });
				}
			} else {
				alertjs.warning({ t: "फक्त JPEG, JPG किंवा PNG फोटो पाहिजे." });
				$(this).val('');
			}
		}
	});

	$(document).on('click', '.galleryAddModel', function (e) {
		e.preventDefault();
		$('#image_1').val('');
		$('#image_id').val('');
		$('#gallery_mode').val('add');
		$('#image_title').val('');
		$('#image_desc').val('');
		$('#image-1-preview').prop('src', '');
		$('#progress').addClass('d-none');
		openModal('#marriageModel');
		$('.modal-title').html('नवीन छायाचित्र जोडा');
	});

	$(document).on('click', '.editImage', function (e) {
		e.preventDefault();
		var id = $(this).attr('data-id');
		var title = $(this).attr('data-title');
		var desc = $(this).attr('data-desc');
		var image = $(this).attr('data-image');

		$('#image_1').val('');
		$('#image_id').val(id);
		$('#gallery_mode').val('edit');
		$('#image_title').val(title);
		$('#image_desc').val(desc);
		$('#image-1-preview').prop('src', `/gp/asstes/images/gallery/${image}`);
		$('#progress').addClass('d-none');
		
		openModal('#marriageModel');
		$('.modal-title').html('छायाचित्र संपादित करा');
	});

	$(document).on('click', '.removeImage', function (e) {
		e.preventDefault();
		const btn = $(this);
		var id = btn.attr('data-id');
		var image = btn.attr('data-image');

		alertjs.deleteSpl('सदर छायाचित्र काढायचे आहे का?', async function (status) {
			if (status) {
				btn.prop('disabled', true);
				try {
					const response = await fetch('/gallery/remove-image', {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify({ id, image })
					});
					const resData = await response.json();
					if (resData.success) {
						alertjs.success(
							{
								t: 'छायाचित्र',
								m: 'यशस्वी रित्या काढल्या गेले.',
							},
							function () {
								window.location.reload();
							}
						);
					} else {
						alertjs.warning({ t: "त्रुटी", m: resData.message || 'काहीतरी चुकले.' });
						btn.prop('disabled', false);
					}
				} catch (err) {
					console.error("Delete error:", err);
					alertjs.warning({ t: "त्रुटी", m: "सर्व्हर एरर आली आहे." });
					btn.prop('disabled', false);
				}
			}
		});
	});

	$(document).on('click', '#submit-gallery-img-btn', handleUpload);

	async function handleUpload(e) {
		e.preventDefault();
		
		var mode = $('#gallery_mode').val();
		var id = $('#image_id').val();
		var url = mode === 'edit' ? `/gallery/edit/${id}` : '/gallery';
		var method = mode === 'edit' ? 'PUT' : 'POST';

		// Form Validation
		if (mode === 'add' && !$('#image_1').val()) {
			alertjs.warning({ t: 'कृपया फोटो निवडा.' });
			return;
		}
		if (!$('#image_title').val().trim() || !$('#image_desc').val().trim()) {
			alertjs.warning({ t: 'कृपया शीर्षक आणि वर्णन भरा.' });
			return;
		}

		let formData = new FormData(document.getElementById('gallery-form'));
		const submitBtn = $('#submit-gallery-img-btn');
		submitBtn.prop('disabled', true);

		try {
			$('#progress').removeClass('d-none');
			$('#progress-bar').prop('value', 30);

			const response = await fetch(url, {
				method: method,
				body: formData
			});

			$('#progress-bar').prop('value', 100);

			const data = await response.json();
			if (data.success) {
				alertjs.success(
					{
						t: mode === 'edit' ? 'छायाचित्र संपादित' : 'नवीन छायाचित्रे',
						m: 'यशस्वी रित्या जतन केली आहे.',
					},
					function () {
						closeModal('#marriageModel');
						window.location.reload();
					}
				);
			} else {
				alertjs.warning({ t: "त्रुटी", m: data.message || 'काहीतरी चुकले.' });
				submitBtn.prop('disabled', false);
			}
		} catch (err) {
			console.error("Upload error:", err);
			alertjs.warning({ t: "त्रुटी", m: "सर्व्हर एरर आली आहे." });
			submitBtn.prop('disabled', false);
			window.location.reload();
		}
	}
});
