$(document).ready(() => {
	console.log('gov yojna beneficiary js loaded');

	let isEditMode = false;

	/* =====================================
      SET FORM DATA
  ===================================== */

	function setFormData(item) {
		$('#id').val(item.id || '');
		$('#from_year').val(item.from_year || '');
		$('#to_year').val(item.to_year || '');
		$('#document_name').val(item.document_name || '');
		$('#document_desc').val(item.document_desc || '');
		$('#file-help-text').text(
			'नवीन फाइल अपलोड करण्यासाठी नवीन दस्तऐवज निवडा (ऐच्छिक).'
		);
	}

	/* =====================================
      RESET FORM
  ===================================== */

	function resetForm() {
		document.getElementById('gov-beneficiary-form').reset();
		$('#id').val('');
		isEditMode = false;

		$('#form-title').html(`
      <i class="fa fa-upload me-2"></i>
      लाभार्थी यादी अपलोड
    `);

		$('#submit-beneficiary-btn').html(`
      <i class="fa fa-save me-2"></i>
      जतन करा
    `);

		$('#file-help-text').text(
			'नवीन यादी जोडण्यासाठी फाइल अपलोड करणे आवश्यक आहे.'
		);
		$('#cancel-edit-btn').addClass('d-none');
	}

	/* =====================================
      EDIT MODE
  ===================================== */

	$(document).on('click', '.edit-beneficiary-btn', function () {
		let item = $(this).attr('data-item');

		try {
			item = JSON.parse(item);
		} catch (err) {
			console.error(err);
			return;
		}

		isEditMode = true;
		setFormData(item);

		$('#form-title').html(`
      <i class="fa fa-edit me-2"></i>
      लाभार्थी यादी अपडेट
    `);

		$('#submit-beneficiary-btn').html(`
      <i class="fa fa-edit me-2"></i>
      अपडेट करा
    `);

		$('#cancel-edit-btn').removeClass('d-none');

		window.scrollTo({
			top: 0,
			behavior: 'smooth'
		});
	});

	/* =====================================
      CANCEL EDIT
  ===================================== */

	$('#cancel-edit-btn').on('click', function () {
		resetForm();
	});

	/* =====================================
      SAVE / UPDATE CLICK
  ===================================== */

	$('#submit-beneficiary-btn').on('click', function (e) {
		e.preventDefault();

		const fromYear = $('#from_year').val().trim();
		const toYear = $('#to_year').val().trim();
		const docName = $('#document_name').val().trim();
		const fileInput = document.getElementById('file');

		if (!fromYear || !toYear || !docName) {
			alertjs.warning({
				t: 'वातावरण चेतावणी',
				m: 'कृपया सर्व आवश्यक फील्ड भरा.'
			});
			return;
		}

		if (!isEditMode && (!fileInput.files || fileInput.files.length === 0)) {
			alertjs.warning({
				t: 'फाइल चेतावणी',
				m: 'कृपया लाभार्थी यादीची पीडीएफ किंवा वर्ड फाइल निवडा.'
			});
			return;
		}

		let formData = new FormData(
			document.getElementById('gov-beneficiary-form')
		);

		if (isEditMode) {
			updateBeneficiary(formData);
		} else {
			saveBeneficiary(formData);
		}
	});

	/* =====================================
      SAVE
  ===================================== */

	async function saveBeneficiary(formData) {
		try {
			let { success, message } = await fetch('/gov-yojana-beneficiary', {
				method: 'POST',
				body: formData
			}).then((r) => r.json());

			if (success) {
				alertjs.success(
					{
						t: 'यशस्वी',
						m: message
					},
					() => {
						location.reload();
					}
				);
			} else {
				alertjs.warning({
					t: 'चेतावणी',
					m: message
				});
			}
		} catch (err) {
			console.error(err);
			alertjs.warning({
				t: 'त्रुटी',
				m: err?.message || 'काहीतरी चूक झाली'
			});
		}
	}

	/* =====================================
      UPDATE
  ===================================== */

	async function updateBeneficiary(formData) {
		try {
			let { success, message } = await fetch('/gov-yojana-beneficiary', {
				method: 'PUT',
				body: formData
			}).then((r) => r.json());

			if (success) {
				alertjs.success(
					{
						t: 'यशस्वी',
						m: message
					},
					() => {
						location.reload();
					}
				);
			} else {
				alertjs.warning({
					t: 'चेतावणी',
					m: message
				});
			}
		} catch (err) {
			console.error(err);
			alertjs.warning({
				t: 'त्रुटी',
				m: err?.message || 'काहीतरी चूक झाली'
			});
		}
	}

	/* =====================================
      DELETE
  ===================================== */

	$(document).on('click', '.delete-beneficiary-btn', function (e) {
		e.preventDefault();

		let id = $(this).attr('data-id');

		if (!confirm('तुम्हाला खात्री आहे की तुम्ही ही यादी हटवू इच्छिता?')) {
			return;
		}

		fetch('/gov-yojana-beneficiary', {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ id })
		})
			.then((result) => result.json())
			.then((result) => {
				if (result.success) {
					alertjs.success(
						{
							t: 'यशस्वी',
							m: result.message
						},
						() => {
							window.location.reload();
						}
					);
				} else {
					alertjs.warning({
						t: 'चेतावणी',
						m: result.message
					});
				}
			})
			.catch((err) => {
				console.error(err);
				alertjs.warning({
					t: 'त्रुटी',
					m: err?.message || 'काहीतरी चूक झाली'
				});
			});
	});
});
