$(document).ready(() => {
	let is_edit = false
	let attendance_year_dropdown_html = attendanceYears.map((year) => {
		return `
			<option value=${year.sabha_year}>${year.sabha_year}</option>	
		`
	})
	$('#sabha-year-print-dropdown').append(attendance_year_dropdown_html)

	// on change of sabha year get the print data as per year select .
	$('#sabha-year-print-dropdown').on('change', function (e) {
		console.log($(this).val())
		let selected_year = $(this).val()
		fetch('/masik-notice/get-month-wise-sabha-attendance', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ selected_year }),
		})
			.then((result) => {
				return result.json()
			})
			.then((result) => {
				print_sabha_month_list_table(result.data)
			})
			.catch((err) => {
				alertjs.warning({ t: 'Something went wrong', m: err }, () => {})
			})
	})

	function print_sabha_month_list_table(data) {
		$('.sabha-details-list').html(
			data.map((el) => {
				let marathi_month_name =
					months_map_marathi[el.sabha_month - 1].monthName
				let marathi_month_number =
					months_map_marathi[el.sabha_month - 1].monthNumber
				return `
		<tr> 
			<td>${marathi_month_number}) &nbsp;${marathi_month_name}</td>	
			<td> 
				<button class='btn btn-success btn-sm edit-sabha-attendance-button' data-id='${el.sabha_month}'> 
					<i class='fa fa-edit'></i>	
				</button>	
			</td>	
			<td> 
				<button class='btn btn-danger btn-sm delete-sabha-attendance-button' data-id='${el.sabha_month}'> 
					<i class='fa fa-trash'></i>	
				</button>	
			</td>	
		</tr>
		`
			})
		)
	}

	$(document).on('click', '.delete-sabha-attendance-button', function (e) {
		e.preventDefault()
		let delete_month_id = +$(this).attr('data-id')
		let delete_sabha_year = +$('#sabha-year-print-dropdown').val()

		fetch('/masik-notice/delete-sabha-attendance', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ delete_month_id, delete_sabha_year }),
		})
			.then((result) => {
				return result.json()
			})
			.then((result) => {
				if (result.call === 1) {
					alertjs.success({ t: 'Successful' }, () => {
						window.location.reload()
					})
				}
			})
			.catch((err) => {
				alertjs.warning({ t: 'Something went wrong' }, () => {})
			})
	})

	$(document).on('click', '.edit-sabha-attendance-button', function (e) {
		$('#sabha-attendance-form').removeClass('d-none')
		$('#sabha-month').attr('readonly', true)
		$('#sabha-year').attr('readonly', true)
		is_edit = true
		let edit_month = $(this).attr('data-id')
		let edit_sabha_year = +$('#sabha-year-print-dropdown').val()

		fetch('/masik-notice/get-edit-sabha-attendance-details', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ edit_month, edit_sabha_year }),
		})
			.then((result) => {
				return result.json()
			})
			.then((result) => {
				console.log(result)
				if (result.call === 1) {
					$('#sabha-year').val(edit_sabha_year)
					$('#sabha-month').val(edit_month)
					fill_edit_details_into_sabha_attendance_form(result.data)
				}
			})
			.catch((err) => {
				alertjs.warning({ t: 'Something went wrong' }, () => {})
			})
	})

	function fill_edit_details_into_sabha_attendance_form(data) {
		let sabasab_attendance_html = data
			.map((el, i) => {
				return `
						<tr class='text-center'> 
								<td>${i + 1}</td>
								<td>${el.sabasad_name}</td>

								<td class='d-flex gap-2'>
									<input type='checkbox' class='form-check-input' ${
										el.is_present !== -1 ? 'checked' : ''
									}/> 
									<input type='text' name='${
										el.sabasad_name
									}' class='form-control w-25 ms-3' value='${
										el.m_bhatta ? el.m_bhatta : ''
									}' /> 
								</td>
						</tr> 
			`
			})
			.join('')

		$('.sabasad-list-body').html(sabasab_attendance_html)
	}

	let monthsDropDownHtml = months.map((month) => {
		return `
           <option value=${month.id}>${month.month}</option> 
        `
	})

	$('#sabha-month').html(monthsDropDownHtml)

	let sabasadListHtml = sabhasadList
		.map((el, i) => {
			return `
                    <tr class='text-center'> 
                            <td>${i + 1}</td>
                            <td>${el.name}</td>
                            <td>${el.p_name}</td>
                            <td class='d-flex gap-2'>
								<input type='checkbox' class='form-check-input' /> 
								<input type='text' name='${el.name}' class='form-control w-25 ms-3'/> 
                            </td>
                    </tr> 
        `
		})
		.join('')

	$('.sabasad-list-body').html(sabasadListHtml)
	// $('.form-check-input').change(function () {
	// 	if (this.checked) {
	// 		$(this).siblings().prop('readonly', false)
	// 	} else {
	// 		$(this).siblings().prop('readonly', true)
	// 	}
	// })

	$(document).on('keyup', '.form-control', function () {
		if (isNaN($(this).val())) {
			$(this).val('')
		}
	})

	$(document).on('click', '#submit-sabha-attendance-form', function (e) {
		e.preventDefault()

		let sabhaYear = $('#sabha-year').val()
		let sabhaMonth = $('#sabha-month').val()

		if (sabhaMonth === '') {
			alertjs.warning(
				{
					t: 'Warning',
					m: 'कृपया सभा महिना लिहा',
				},
				() => {}
			)
			return
		}

		if (sabhaYear === '') {
			alertjs.warning(
				{
					t: 'Warning',
					m: 'कृपया सभा वर्ष लिहा',
				},
				() => {}
			)
			return
		}

		if (is_edit === true) {
			getHajeriDataFromForm((data) => {
				postHajeriData(data, sabhaMonth, sabhaYear)
			})
			return
		}

		checkIfAlreadyFilled(sabhaMonth, sabhaYear, (isAlreadyFilled) => {
			console.log('isAlreadyFilled', isAlreadyFilled)
			if (isAlreadyFilled) {
				alertjs.warning(
					{
						t: 'Warning',
						m: 'हजेरी आदीच भरली गेली आहे. कृपया नवीन भरण्याची असल्यास पहिली डिलीट करा',
					},
					() => {}
				)
				return
			} else {
				getHajeriDataFromForm((data) => {
					postHajeriData(data, sabhaMonth, sabhaYear)
				})
			}
		})
	})

	function checkIfAlreadyFilled(sabhaMonth, sabhaYear, cb) {
		let isAlreadyFilled = false
		let sendData = { year: sabhaYear, month: sabhaMonth }
		fetch('/masik-notice/check-already-filled', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(sendData),
		})
			.then((result) => {
				return result.json()
			})
			.then((result) => {
				if (result.call === 1) {
					console.log('found')
					isAlreadyFilled = true
					cb(isAlreadyFilled)
				} else {
					console.log('not found')
					cb(isAlreadyFilled)
				}
			})
			.catch((err) => {
				alertjs.warning({ t: 'Error', m: err })
			})
	}

	function getHajeriDataFromForm(cb) {
		let sabhaMonth = $('#sabha-month').val()
		let form = document.getElementById('sabha-attendance-form')

		let formData = new FormData(form)

		let sendData = []

		for (let [key, value] of formData) {
			console.log(value, '---')
			sendData.push({
				name: key,
				payAmount: value ? +value : 0,
				isPresent: +value !== 0 ? sabhaMonth : -1,
			})
		}
		cb(sendData)
	}

	function postHajeriData(_data, sabhaMonth, sabhaYear) {
		let final_send_data = {
			_data,
			sabhaMonth: +sabhaMonth,
			sabhaYear,
		}
		let url
		if (is_edit === true) {
			url = '/masik-notice/post-edit-sabha-attendance-data'
		} else {
			url = '/masik-notice/sabha-attendance'
		}
		fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(final_send_data),
		})
			.then((data) => {
				return data.json()
			})
			.then((data) => {
				if (is_edit === true && data.call === 1) {
					alertjs.success({ t: 'Successful', m: 'Updated attendance records.' }, () => {
						window.location.reload()
					})
				} else {
					alertjs.success({ t: 'Successful', m:'Saved attendance records.' }, function () {
						window.location.reload()
					})
				}
			})
			.catch((error) => {
				alertjs.warning({ t: 'Error', m: error })
			})
	}

	// print attendance
	$('#print-attendance-form').on('click', function (e) {
		e.preventDefault()
		$('.sabha-print-option').removeClass('d-none')
		$('#sabha-attendance-form').addClass('d-none')
		$('.attendance-print-table').removeClass('d-none')
	})

	// fill attendance from btn
	$('#fill-attendance-form').on('click', function (e) {
		e.preventDefault()
		// $('.sabha-print-option').addClass('d-none')
		// $('#sabha-attendance-form').removeClass('d-none')
		// $('.attendance-print-table').addClass('d-none')
		window.location.reload()
	})

	// print sabha attendance as per year select
	$(document).on('click', '#print-sabha-attendance', function (e) {
		e.preventDefault()
		let selectedYear = $('#sabha-year-print-dropdown').val()
		if (selectedYear === '' || selectedYear === '-1') {
			alertjs.warning({t: 'कृपया वर्ष निवडा'}, ()=>{})
			return;
		}
		let _year = $('#sabha-year-print-dropdown').val()
		window.open(`/masik-notice/print-attendance?year=${_year}`, '_blank')
	})
})
