$(document).ready(function () {
	let gp_members = member.sList || []

	let is_gp_member_edit = false

	let saveMemberButton = $('#saveMember')
	let updateMemberButton = $('#updateMember')
	updateMemberButton.hide()

	function setIsGpMemberEdit(booleanValue) {
		is_gp_member_edit = booleanValue

		// console.log('isEdit ', is_gp_member_edit)

		// Check the value of isEdit and toggle the visibility of buttons accordingly
		if (is_gp_member_edit) {
			// If isEdit is true, show the updateMember button and hide saveMember button
			saveMemberButton.hide()
			updateMemberButton.show()
		} else {
			// If isEdit is false, show the saveMember button and hide updateMember button
			saveMemberButton.show()
			updateMemberButton.hide()
		}
	}

	function setGpMembers(_newArray) {
		gp_members = [..._newArray]
	}


	let sortArray = []
	$(function () {
		member.printMember(function (list) {
			$('#sadasyaList').html(list)
		})
		$('#sadasyaList').sortable({
			placeholder: 'ui-state-highlight',
			update: function (event, ui) {
				sortArray = []
				$('#sadasyaList .single-user').each(function (event) {
					sortArray.push(Number($(this).attr('id')))
				})

				let list = sortArray.map(function (element, index) {
					let user = member.sList[element]
					user.priority = index
					return user
				})
				setGpMembers(list)
				member.sList = list
				member.updateList(function () {
					member.printMember(function (list) {
						$('#sadasyaList').html(list)
					})
				})
			},
		})
	})

	let snapMale = ''
	let memberImage = ''
	$('#sadasyaAadhar').mask('0000-0000-0000')

	$('#image_1').on('change', function (e) {
		snapMale = ''
		$('#image-1-preview').prop('src', snapMale)
		let input = $(this)[0]
		memberImage = input.files[0]
		let fileName = $(this).val().split('\\').pop()
		extension = fileName.substring(fileName.lastIndexOf('.') + 1)

		if (
			extension == 'jpeg' ||
			extension == 'JPEG' ||
			extension == 'jpg' ||
			extension == 'JPG'
		) {
			if (input.files && input.files[0]) {
				if (input.files[0].size > 524288) {
					alert('Try to upload file less than 512KB!')
					$(this).val('')

					e.preventDefault()
				} else {
					$(this)
						.siblings('.custom-file-label')
						.addClass('selected')
						.html(fileName)
					let reader = new FileReader()
					reader.onload = function (e) {
						$('#image-1-preview').prop('src', e.target.result)
						// uploadImage();
					}
					reader.readAsDataURL(input.files[0]) // convert to base64 string
				}
			}
		} else {
			alert('फक्त JPEG किंवा JPG फोटो पाहिजे आणि size 1 MB पर्यंत')
			$(this).val('')
		}
	})

	$(document).on('click', '.galleryAddModel', function (e) {
		e.preventDefault()
		if (is_gp_member_edit) {
			$('#resetFormBtn').trigger('click')
		}
		setIsGpMemberEdit(false)

		let data = Number($(this).attr('data-id'))
		$('#image_1').val('')
		memberImage = ''
		$('#image-1-preview').prop('src', '')
		$('#progress').addClass('d-none')
		$('#memberName').val('')
		$('#marriageModel').modal({
			show: true,
		})

		$('.modal-title').html('नवीन सदस्य जोडा')
		member.printPostList(function (list) {
			list.unshift('<option value="-1">---- SELECT ----</option>')
			$('#memberType').html(list)
		})
		member.printToList(function (list) {
			list.unshift('<option value="-1">---- SELECT ----</option>')
			$('#memberTo').html(list)
		})
	})

	$(document).on('click', '.removeImage', function (e) {
		setIsGpMemberEdit(false)
		alertjs.deleteSpl('सदर सदस्याची माहिती काढायची आहे का?', (status) => {
			if (status) {
				let id = Number($(this).data('id'))
				let image_name = member.sList[id].image
				deleteImage({ image: image_name }, function (status, data) {
					if (!status) {
						alertjs.warning({
							t: data,
						})
						return false
					}
					alertjs.success({ t: 'सदस्याची माहिती काढली' }, () => {
						member.sList.splice(id, 1)
						member.updateList(function () {
							member.printMember(function (list) {
								$('#sadasyaList').html(list)
							})
						})
					})
				})
			}
		})
	})

	$(document).on('click', '#saveMember', function (e) {
		e.preventDefault()
		let newFormMember = $('#newFormMember')[0]
		let formData = new FormData(newFormMember)
		formData.set('memberImage', memberImage)

		if (formData.get('memberName') == '') {
			alert('सदस्य नाव आवशक')
			return false
		}
		if (formData.get('memberType') == '-1') {
			alert('सदस्य पद आवशक')
			return false
		}
		if (formData.get('memberTo') == '-1') {
			alert('Section आवशक')
			return false
		}
		if (formData.get('memberImage') == '') {
			alert('सदस्य छायाचित्र आवशक')
			return false
		}
		$('#saveMember').prop('disabled', true)
		uploadImage(formData, function (status, data) {
			if (!status) {
				alert(data)
				$('#saveMember').prop('disabled', false)
				return false
			}
			let p_id = formData.get('memberType')
			let p_name = member.sPost.filter(function (post) {
				return post.id == p_id
			})
			let to_id = formData.get('memberTo')
			let to_name = member.sTo.filter(function (to) {
				return to.id == to_id
			})

			this.sTo = []
			let sendData = {
				name: formData.get('memberName'),
				post: Number(formData.get('memberType')),
				section: Number(formData.get('memberTo')),
				p_name: p_name[0].post_name,
				s_name: to_name[0]?.to_name,
				sadasyaAadhar: formData.get('sadasyaAadhar'),
				sadasyaMobile: formData.get('sadasyaMobile'),
				image: data.data,
                sadasyaInfo: formData.get('sadasyaInfo')
			}
			member.sList.push(sendData)
			member.updateList(function (status) {
				if (!status) {
					alert('Unable to update list')
					$('#saveMember').prop('disabled', false)
					return false
				}
				member.printMember(function (list) {
					$('#saveMember').prop('disabled', false)
					$('#sadasyaList').html(list)
					$('#marriageModel').modal('hide')
					$('#memberName').val('')
				})
			})
		})
	})

	const handleUpdateGpMembers = async (formData) => {
		try {
			let url = `/master/manage-gp/update-single-member`
			const _updateResponse = await fetch(url, {
				method: 'PUT',
				body: formData,
			})

			const _updateResponseData = await _updateResponse.json()

			if (_updateResponseData.call == 1) {
				alertjs.success(
					{
						t: 'अपडेट झाले',
					},
					() => {
						window.location.reload()
					}
				)
			}
		} catch (err) {
			console.log(`Error while upating the members : ${err}`)

			alertjs.warning({
				t: 'अपडेट नाही झाले',
			})
		}
	}

	updateMemberButton.on('click', function (e) {
		e.preventDefault()

		let index = $(this).attr('data-index')
		let oldImageName = $(this).attr('data-oldImageName')
		let priority = $(this).attr('data-priority')

		const formData = new FormData()

		formData.set('index', index)
		formData.set('name', $('#memberName').val())

		let _post = $('#memberType').val()
		let postData = member.sPost.find((_postData) => {
			return _postData.id == _post
		})

		formData.set('p_name', postData.post_name)
		formData.set('post', _post)

		let _section = $('#memberTo').val()
		let sectionData = member.sTo.find((_sectionData) => {
			return _sectionData.id == _section
		})

		formData.set('section', _section)
		formData.set('s_name', sectionData.to_name)
		formData.set('sadasyaAadhar', $('#sadasyaAadhar').val())
		formData.set('sadasyaMobile', $('#sadasyaMobile').val())
        formData.set('sadasyaInfo', $('#sadasyaInfo').val())
		formData.set('oldImageName', oldImageName)
		formData.set('photoFile', $('#image_1')[0].files[0] || null)
		// console.log(gp_members[index])
		formData.set('priority', priority)
		formData.set('gp_members', JSON.stringify(gp_members))

		// console.log('files = ', $('#image_1')[0].files[0])

		// for (const [key, value] of formData.entries()) {
		// 	console.log(`${key} ::: ${value}`)
		// }

		handleUpdateGpMembers(formData)
	})

	$(document).on('click', '.editImage', function (e) {
		e.preventDefault()
		setIsGpMemberEdit(true)
		let index = $(this).attr('data-id')
		console.log($(this).attr('data-data'))
		// console.log('index = ', index)
		let memberData = JSON.parse($(this).attr('data-data'))
		// console.log(memberData)

		$('#marriageModel').modal({
			show: true,
		})

		$('#memberName').val(memberData.name)

		member.printPostList(function (list) {
			list.unshift('<option value="-1">---- SELECT ----</option>')
			$('#memberType').html(list)
		})

		$('#memberType option').each(function () {
			if ($(this).val() == memberData.post) {
				$(this).prop('selected', true)
			}
		})

		member.printToList(function (list) {
			list.unshift('<option value="-1">---- SELECT ----</option>')
			$('#memberTo').html(list)
		})

		$('#memberTo option').each(function () {
			if ($(this).val() == memberData.section) {
				$(this).prop('selected', true)
			}
		})
		$('#sadasyaAadhar').val(memberData.sadasyaAadhar)
		// $('#memberName').val(memberData.name);
		$('#sadasyaMobile').val(memberData.sadasyaMobile)
        $('#sadasyaInfo').val(memberData.sadasyaInfo)

		updateMemberButton.attr('data-index', index)
		updateMemberButton.attr('data-oldImageName', memberData.image)
		updateMemberButton.attr('data-priority', memberData.priority)
	})

	function uploadImage(formData, callback) {
		$.ajax({
			url: '/master/manage-gp/upload-image',
			enctype: 'multipart/form-data',
			processData: false, // Important!
			contentType: false,
			cache: false,
			method: 'post',
			data: formData,
			error: function () {
				callback(false, 'Your are having server issue')
			},
			success: function (data) {
				callback(true, data)
			},
		})
	}
	function deleteImage(formData, callback) {
		$.ajax({
			url: '/master/manage-gp/delete-image',
			method: 'post',
			data: formData,
			error: function () {
				callback(false, 'Your are having server issue')
			},
			success: function (data) {
				callback(true, data)
			},
		})
	}


	// 	below code is associated with the file gram_sadasya.pug file 
	// when we open the modal for adding the new member, and there is one Section label, and to add another option in it, we will be giving a button

	// 

	// Show the section when "Add Other Section" button is clicked
	$(document).on('click', '#add-other-section-btn', function (e) {
		e.preventDefault();

		$('#other-section-group').show();                // Show the input group
		$('#add-other-section-btn').hide();              // Hide the "Add" button
		$('#cancel-add-other-section-btn').show();       // Show the "Cancel" button
	});

	// Hide the section when "Cancel" is clicked
	$(document).on('click', '#cancel-add-other-section-btn', function (e) {
		e.preventDefault();

		$('#other-section-group').hide();                // Hide the input group
		$('#add-other-section-btn').show();              // Show the "Add" button again
		$('#cancel-add-other-section-btn').hide();       // Hide the "Cancel" button
	});


	$(document).on('click', '#add-other-member-to-btn', async function (e) {
		e.preventDefault();

        try {

            const newValue = $("input[name='otherMemberTo']").val()?.trim();
            if (!newValue) {
                alert("कृपया काहीतरी मूल्य प्रविष्ट करा");
                return;
            }

            // Call your existing abstracted API function

            let resData = await fetch('/master/gram-sadasya/add-section', {
                method: 'post',
                body: JSON.stringify({ sectionName: newValue }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            

            let { success, data } = await resData.json()
            // api call is done

            if (success) {
                alert('Section Added.')
                const $select = $('#memberTo');

                $select.append(
                    $('<option>', {
                        value: data?._id || newValue,
                        text: newValue,
                        selected: true
                    })
                );
                // console.log("Before");
                // console.log(member.sTo)
                member.sTo.push({id: data?._id || newValue, to_name: newValue})
                // console.log("After");
                // console.log(member.sTo)
                

                $("input[name='otherMemberTo']").val('');
                $('#other-section-group').hide();
                $('#add-other-section-btn').show();
                $('#cancel-add-other-section-btn').hide();
            } else {
                alertjs.warning({
                    t: "Warning",
                    m: "काहीतरी चूक झाली, कृपया पुन्हा प्रयत्न करा."
                });
            }

        } catch (err) {
            console.error('Error:', err);
        }
	});



	// for uploading the grampanchayt image

	$(document).on('click', '#save-gp-image-btn', async function (e) {
		e.preventDefault()

		try {
			const res = await fetch('/gp/gp-image', {
				method: 'post',
				body: new FormData(document.getElementById('gp-image-form'))
			})

			let { success, message } = await res.json()

			if (success) {
				alertjs.success({
					t: 'SUCCESS',
					m: message
				}, () => location.reload())
				return
			}

			alertjs.warning({
				t: 'WARNING',
				m: message
			})
		} catch (err) {
			console.error('Error:', err);
		}
	})



    // for edit/ means we are not gonna actually edit it, we will delete the entry itself

    async function fetchSectionList(){
        try {
            const {success, data} = await fetch('/master/gram-sadasya/section').then(r => r.json())

            return success ? data?.sectionList : []
        } catch (err) {
            console.error('Error:', err);
            return []
        }
    }

    $(document).on('click', '#edit-other-section-btn', function(e){
        e.preventDefault();

        //
        $('#other-section-group-list').show();
        $('#edit-other-section-btn').hide(); 
        $('#cancel-edit-other-section-btn').show();

        showSNamesList();

    })

    $(document).on('click', '#cancel-edit-other-section-btn', function(e){
        e.preventDefault();

        //
        $('#other-section-group-list').hide();
        $('#edit-other-section-btn').show(); 
        $('#cancel-edit-other-section-btn').hide();
    })

        
    let mainSNames = [
        "मुख्य सदस्य",
        "उप सदस्य",
        "कर्मचारी / लिपिक",
        "गावातील प्रतिष्टीत नागरीक",
        "गावातील मार्गदर्शक"
    ];

    // normalize helper: lowercase + remove ALL spaces
    function normalizeText(text = "") {
        return text
            .toLowerCase()
            .replace(/\s+/g, "")   // remove all spaces
            .trim();
    }

    // pre-normalize main list once
    const normalizedMainSNames = mainSNames.map(name => normalizeText(name));

    async function showSNamesList() {

        let sectionList = await fetchSectionList();

        let listItems = sectionList.map((sItem, _index) => {

            const originalName = sItem.to_name || "";
            const normalizedName = normalizeText(originalName);

            const isMainSection = normalizedMainSNames.includes(normalizedName);

            return `
                <div style="height:3rem;width:100%;border:1px solid black;display:flex;align-items:center;justify-content:space-between;margin-bottom:0.4rem;padding-inline:0.2rem;">
                    <span>${_index + 1}. ${originalName}</span>
                    ${
                        !isMainSection
                            ? `<button data-sId="${sItem.id}" class="delete-section-item-btn btn btn-sm btn-danger">
                                    <i class="fa fa-trash"></i>
                            </button>`
                            : ""
                    }
                </div>
            `;
        }).join("");

        $("#other-section-group-list").html(`
            <div>एकूण : ${sectionList.length}</div>
            ${listItems}
        `);
    }



    async function handleDeleteSection(sId){
        try {

            const {success, message, data} = await fetch(`/master/gram-sadasya/delete-section/${sId}`, {method: "DELETE"}).then(r => r.json())
            
            if(success){
                alert(message);
                showSNamesList();
            }else{
                alert(message)
            }
        } catch (err) {
            console.error('Error:', err);
            alert("Error while deleting the section")
        }
    }
    $(document).on('click', '.delete-section-item-btn', function(e){
        e.preventDefault();
        let sId = $(this).attr('data-sId');
        handleDeleteSection(sId)
    })

})

let member = new Member()
function Member() {
	const _this = this
	this.sList = []
	this.sPost = []
	this.sTo = []

	this.printPostList = function (callback) {
		let list = this.sPost.map(function (post) {
			return `<option value="${post.id}">${post.post_name}</option>`
		})
		callback(list)
	}

	this.printToList = function (callback) {
		let list = this.sTo.map(function (to) {
			return `<option value="${to.id}">${to.to_name}</option>`
		})
		callback(list)
	}

	this.printMember = function (callback) {
		let list = this.sList.map(function (member, index) {
			return `<div class="col-10 col-sm-5 col-md-3 col-lg-2 gallery-image single-user mx-auto" id="${index}">
			<div class="gallery-image-div w-100">
				<img
					class="img img-thumbnail"
					src="/gp/asstes/images/team/${member.image}"
					style="width:100% !important; display:block; margin-inline: auto; height: 200px"
					onerror='this.src="/img/fallback/default-avatar-fallback-img.jpg"'
				/>
			</div>
			<div class="text-center image-s-name">${member.s_name}</div>
			<div class="text-danger gallery-text">${member.p_name}</div>
			<div class="text-primary gallery-text">${member.name}</div>
			<div class="d-flex justify-content-center mt-2" style="gap: 2rem">
				<button
					type="button"
					class="btn mb-1 removeImage bg-danger"
					data-id="${index}"
					style="cursor: pointer"
				>
					<i class="fa fa-trash text-light"></i>
				</button>
				<button
					type="button"
					class="btn mb-1 editImage bg-info"
					data-id="${index}"
					data-data='${JSON.stringify(member)}'
					style="cursor: pointer"
				>
					<i class="fa fa-edit text-light"></i>
				</button>
			</div>
		</div>
		`
		})
		callback(list)
	}

	this.updateList = function (callback) {
		let sendData = {
			url: '/master/manage-gp/update-member',
			method: 'post',
			data: {
				member: JSON.stringify(_this.sList),
			},
		}
		this.ajaxPromise(sendData)
			.then(function (data) {
				callback(true)
			})
			.catch(function (error) {
				console.error(error)
				alert('server error')
				callback(false)
			})
	}
	this.ajaxPromise = function (configData) {
		return new Promise(function (resolve, reject) {
			ajax(configData, function (status, data) {
				if (status) resolve(data)
				else reject(data)
			})
		})
	}
	function ajax(configData, callback) {
		$.ajax(configData)
			.done(function (data) {
				callback(true, data)
			})
			.fail(function (error) {
				callback(false, error)
			})
	}
}
