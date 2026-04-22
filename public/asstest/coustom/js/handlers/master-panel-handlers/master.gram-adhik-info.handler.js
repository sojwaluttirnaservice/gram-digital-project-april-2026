$(function () {

    let gp = {};

    if (typeof _gp != 'undefined') {
        gp = _gp

        console.log(gp)
    }

    const parse = (dataTo) => {
        try {
            return JSON.parse(dataTo);
        } catch (error) {
            console.error('Failed to parse JSON:', error);
            return null; // or throw error, depending on your use case
        }
    };



    var modalGramMahitiTwoList = parse(gp.gp_gramMahitiSamitiList);
    //- modelTwo
    function printModalGramMahitiTwoList() {
        var list = modalGramMahitiTwoList?.map(function (value, index) {
            return `<div class="col-6 col-md-4 col-lg-3 modalGramMahitiTwoImage position-relative">
                                        <button class="btn btn-danger btn-sm position-absolute deleteModalGramMahitiTwoImage end-0" data-del="${index}">DEL</button>
                                        <p class="position-absolute top-0 bg-white p-1 px-2 border border-2" style="right:10px">${value.name}</p>
                                        <img class="h-100 w-100" src="/new-gp-page/main-page/images/smeti/${value.file}">
                                    </div>`;
        }).join('')
        $('#modalGramMahitiTwoImageList').html(list)
    }
    printModalGramMahitiTwoList();

    $('#modalGramMahitiOneLabel').html(gp.gp_mahiti_title)
    $('#modalGramMahitiOneData').html(gp.gp_mahiti_details);
    $('#saveGramMahiti').on('click', function () {
        var title = $('#modalGramMahitiOneLabel').html();
        var details = $('#modalGramMahitiOneData').html();

        $.post("/master/saveGramMahiti", { title, details }, function (result) {
            if (result.call === 1) {
                alertjs.success({
                    t: 'माहिती जतन केली आहे.'
                }, () => {
                    window.location.reload()
                })
            }
        });
    })
    $('#modalGramMahitiTwoSaveBtn').on('click', function () {
        var inputText = $('#modalGramMahitiTwoTextInput').val();

        var input = $('#modalGramMahitiTwoInput')[0].files[0];
        if (inputText === "") {
            alert('Enter Name');
            return false;
        }
        if (input === undefined) {
            alert('select file');
            return false;
        }
        $('#modalGramMahitiTwoSaveBtn').prop('disabled', true);
        var ext = input.name.lastIndexOf('.');
        ext = input.name.substr(ext + 1)
        if (ext !== 'JPG' || ext !== 'jpg' || ext !== 'JPEG' || ext !== 'jpeg' || ext !== 'PNG' || ext !== 'png') {
            var formData = new FormData();
            formData.append('image', input)
            formData.append('text', inputText)
            formData.append('list', JSON.stringify(modalGramMahitiTwoList))
            $.ajax({
                url: '/master/upload/modalGramMahitiTwoList',
                method: "post",
                processData: false,
                contentType: false,
                cache: false,
                data: formData,
            })
                .done(function (data) {
                    modalGramMahitiTwoList.push({ name: inputText, file: data.newName });
                    printModalGramMahitiTwoList();
                    alertjs.success({ t: 'Samiti added' }, function () {
                        $('#modalGramMahitiTwoInput').val('');
                        $('#modalGramMahitiTwoTextInput').val('')
                        $('#modalGramMahitiTwoSaveBtn').prop('disabled', false);
                    });

                })
                .fail(function (error) {
                    alert(error)
                    console.log(error);
                    $('#modalGramMahitiTwoSaveBtn').prop('disabled', false);
                });

        } else {
            alert('Invalid file');
            return false
        }
    })
    $(document).on('click', '.deleteModalGramMahitiTwoImage', function () {
        var isDelete = confirm('Are you sure to delete ?')
        if (isDelete === false) {
            return false
        }
        var index = $(this).data('del');
        modalGramMahitiTwoList.splice(index, 1);
        var formData = new FormData();
        formData.append('list', JSON.stringify(modalGramMahitiTwoList))
        $.ajax({
            url: '/master/delete/modalGramMahitiTwoList',
            method: "post",
            processData: false,
            contentType: false,
            cache: false,
            data: formData,
        }).done(function (data) {
            printModalGramMahitiTwoList();
            alert('Samiti deleted');
        })
            .fail(function (error) {
                alert(error)
                console.log(error);
            });
    })

    //- model Three
    var modalGramMahitiThreeList = parse(gp.gp_gramMahitiUdyogiList)

    function printModalGramMahitiThreeList() {
        var list = modalGramMahitiThreeList?.map(function (value, index) {
            return `<div class="col-6 col-md-4 col-lg-3 modalGramMahitiThreeImage position-relative">
                                        <button class="btn btn-danger btn-sm position-absolute deleteModalGramMahitiThreeImageUdyog end-0" data-del="${index}">DEL</button>
                                        <img class="w-100" src="/new-gp-page/main-page/images/dukan/${value.image}">
                                        <div>
                                            <h6 class="fw-bold text-navy-blue card-title">
                                                <i class="fa fa-industry me-2"></i>
                                                <span>${value.inputTextBrand}</span>
                                            </h6>
                                            <h6 class="mt-1 text-navy-blue card-text d-flex flex-column flex-md-row align-items-center">
                                                <div class='d-flex align-items-center' style='gap: 0.1rem;'>
                                                    <i class="fa fa-user mr-2"></i>
                                                    <span>${value.inputTextName}</span>
                                                </div>
                                                <div class='d-flex align-items-center' style='gap: 0.1rem;'>
                                                    <i class="fa fa-phone ml-4 mr-1"></i>
                                                    <span>${value.inputTextNumber}</span>
                                                </div>
                                            </h6>
                                        </div>
                                    </div>`;
        }).join('')
        $('#modalGramMahitiThreeImageList').html(list)
    }
    printModalGramMahitiThreeList();

    $('#modalGramMahitiThreeSaveBtn').on('click', function () {
        var inputTextBrand = $('#modalGramMahitiThreeTextInputBrand').val();
        var inputTextName = $('#modalGramMahitiThreeTextInputName').val();
        var inputTextNumber = $('#modalGramMahitiThreeTextInputNumber').val();

        var input = $('#modalGramMahitiThreeInput')[0].files[0];
        if (inputTextBrand === "" || inputTextName === "" || inputTextNumber === "") {
            alert('Enter All Input Fields');
            return false;
        }
        if (input === undefined) {
            alert('select file');
            return false;
        }
        $('#modalGramMahitiThreeSaveBtn').prop('disabled', true);
        var ext = input.name.lastIndexOf('.');
        ext = input.name.substr(ext + 1)
        if (ext !== 'JPG' || ext !== 'jpg' || ext !== 'JPEG' || ext !== 'jpeg' || ext !== 'PNG' || ext !== 'png') {
            var formData = new FormData();
            formData.append('inputTextBrand', inputTextBrand);
            formData.append('inputTextName', inputTextName);
            formData.append('inputTextNumber', inputTextNumber);
            formData.append('image', input)
            formData.append('list', JSON.stringify(modalGramMahitiThreeList))
            $.ajax({
                url: '/master/upload/modalGramMahitiThreeList',
                method: "post",
                processData: false,
                contentType: false,
                cache: false,
                data: formData,
            })
                .done(function (data) {
                    modalGramMahitiThreeList.push({
                        inputTextBrand,
                        inputTextName,
                        inputTextNumber,
                        image: data.newName
                    });
                    printModalGramMahitiThreeList();
                    alertjs.success({ t: 'व्यवसाय जतन केले' }, function () {
                        $('#modalGramMahitiThreeTextInputBrand').val('');
                        $('#modalGramMahitiThreeTextInputName').val('');
                        $('#modalGramMahitiThreeTextInputNumber').val('');
                        $('#modalGramMahitiThreeInput').val('');
                        $('#modalGramMahitiThreeSaveBtn').prop('disabled', false);
                    });
                })
                .fail(function (error) {
                    alert(error)
                    console.log(error);
                    $('#modalGramMahitiThreeSaveBtn').prop('disabled', false);
                });

        } else {
            alert('Invalid file');
            return false
        }
    })

    //- modal four
    var modalGramMahitiFourList = parse(gp.gp_gramNewsList) || []
    function printModalGramMahitiFourList() {
        var list = modalGramMahitiFourList?.map(function (value, index) {
            return `<div class="col-3 modalGramMahitiFourImage position-relative">
                                        <button class="btn btn-danger btn-sm position-absolute deleteModalGramMahitiFourImage end-0" data-del="${index}">DEL</button>
                                        <img class="w-100 h-100" src="/new-gp-page/main-page/images/news/${value.image}">
                                    </div>`;
        }).join('')
        $('#modalGramMahitiFourImageList').html(list)
    }
    printModalGramMahitiFourList()
    
    $('#modalGramMahitiFourSaveBtn').on('click', function () {
        var input = $('#modalGramMahitiFourInput')[0].files[0];
        if (input === undefined) {
            alertjs.warning({ t: 'select file' });
            return false;
        }
        $('#modalGramMahitiFourSaveBtn').prop('disabled', true);
        var ext = input.name.lastIndexOf('.');
        ext = input.name.substr(ext + 1)
        if (ext !== 'JPG' || ext !== 'jpg' || ext !== 'JPEG' || ext !== 'jpeg' || ext !== 'PNG' || ext !== 'png') {
            var formData = new FormData();
            formData.append('image', input)
            formData.append('list', JSON.stringify(modalGramMahitiFourList))
            $.ajax({
                url: '/master/upload/modalGramMahitiFourList',
                method: "post",
                processData: false,
                contentType: false,
                cache: false,
                data: formData,
            })
                .done(function (data) {
                    modalGramMahitiFourList.push({ image: data.newName });
                    printModalGramMahitiFourList();
                    alert('बातमी जतन केले');
                    $('#modalGramMahitiFourInput').val('');
                    $('#modalGramMahitiFourSaveBtn').prop('disabled', false);
                })
                .fail(function (error) {
                    alert(error)
                    console.log(error);
                    $('#modalGramMahitiFourSaveBtn').prop('disabled', false);
                });

        } else {
            alert('Invalid file');
            return false
        }
    })
    //- modal five

    printModalGramMahitiFiveOne('#{gp.gp_gramKendraPhoto}')

    function printModalGramMahitiFiveOne(file) {
        var list = `<div class="col-12 modalGramMahitiFourImage position-relative">
                                       <p class="border border-2 bg-white p-1 position-absolute fw-bold end-0">आरोग्य केंद्र</p>
                                       <img class="w-100 h-100" src="/new-gp-page/main-page/images/arogya/${file}">
                                    </div>`;
        $('#modalGramMahitiFiveImageListOne').html(list)
    }

    $('#modalGramMahitiFiveSaveBtnOne').on('click', function () {
        var input = $('#modalGramMahitiFiveInputOne')[0].files[0];
        if (input === undefined) {
            alert('select file');
            return false;
        }
        $('#modalGramMahitiFiveSaveBtnOne').prop('disabled', true);
        var ext = input.name.lastIndexOf('.');
        ext = input.name.substr(ext + 1)
        if (ext !== 'JPG' || ext !== 'jpg' || ext !== 'JPEG' || ext !== 'jpeg' || ext !== 'PNG' || ext !== 'png') {
            var formData = new FormData();
            formData.append('image', input)
            $.ajax({
                url: '/master/upload/modalGramMahitiFiveListOne',
                method: "post",
                processData: false,
                contentType: false,
                cache: false,
                data: formData,
            })
                .done(function (data) {
                    printModalGramMahitiFiveOne(data.newName);
                    alert('आरोग्य केंद्र चित्र जतन केले');
                    $('#modalGramMahitiFiveInputOne').val('');
                    $('#modalGramMahitiFiveSaveBtnOne').prop('disabled', false);
                })
                .fail(function (error) {
                    alert(error)
                    console.log(error);
                    $('#modalGramMahitiFiveSaveBtnOne').prop('disabled', false);
                });

        } else {
            alert('Invalid file');
            return false
        }
    })

    var modalGramMahitiFiveList = parse(gp.gp_gramKendraList) || []
    function printModalGramMahitiFiveList() {
        var list = modalGramMahitiFiveList.map(function (value, index) {
            return `<div class="col-4 modalGramMahitiThreeImage position-relative mb-1 border border-3">
                                        <button class="btn btn-danger btn-sm position-absolute deleteModalGramMahitiThreeImage end-0" data-del="${index}">DEL</button>
                                        <img class="w-100" src="/new-gp-page/main-page/images/arogya/${value.image}">
                                        <div>
                                            <h4 class="fw-bold text-navy-blue card-title text-center">
                                                <i class="fa fa-user me-2"></i>
                                                <span>${value.adhikariName} (${value.adhikariPost})</span>
                                            </h4>
                                        </div>
                                    </div>`;
        }).join('')
        $('#modalGramMahitiFiveImageListTwo').html(list)
    }
    printModalGramMahitiFiveList();

    $('#modalGramMahitiFiveSaveBtnTwo').on('click', function () {
        var adhikariName = $('#modalGramMahitiFiveInputTwoAdhikariName').val();
        var adhikariPost = $('#modalGramMahitiFiveInputTwoAdhikariPost').val();

        var input = $('#modalGramMahitiFiveInputTwoAdhikariImage')[0].files[0];
        if (adhikariName === "" || adhikariPost === "") {
            alert('Enter All Input Fields');
            return false;
        }
        if (input === undefined) {
            alert('select file');
            return false;
        }
        $('#modalGramMahitiFiveSaveBtnTwo').prop('disabled', true);
        var ext = input.name.lastIndexOf('.');
        ext = input.name.substr(ext + 1)
        if (ext !== 'JPG' || ext !== 'jpg' || ext !== 'JPEG' || ext !== 'jpeg' || ext !== 'PNG' || ext !== 'png') {
            var formData = new FormData();
            formData.append('adhikariName', adhikariName);
            formData.append('adhikariPost', adhikariPost);
            formData.append('image', input)
            formData.append('list', JSON.stringify(modalGramMahitiFiveList))
            $.ajax({
                url: '/master/upload/modalGramMahitiFiveList',
                method: "post",
                processData: false,
                contentType: false,
                cache: false,
                data: formData,
            })
                .done(function (data) {
                    modalGramMahitiFiveList.push({
                        adhikariName,
                        adhikariPost,
                        image: data.newName
                    });
                    printModalGramMahitiFiveList();
                    alert('अधिकारी जतन केले.');



                    $('#modalGramMahitiFiveInputTwoAdhikariName').val('');
                    $('#modalGramMahitiFiveInputTwoAdhikariPost').val('');
                    $('#modalGramMahitiFiveInputTwoAdhikariImage').val('');
                    $('#modalGramMahitiFiveSaveBtnTwo').prop('disabled', false);
                })
                .fail(function (error) {
                    alert(error)
                    console.log(error);
                    $('#modalGramMahitiFiveSaveBtnTwo').prop('disabled', false);
                });

        } else {
            alert('Invalid file');
            return false
        }
    })

    //- six


    var modalGramMahitiSixList = parse(gp.gp_gramYojanaList) || []
    function printModalGramMahitiSixList() {
        var list = modalGramMahitiSixList?.map(function (value, index) {
            return `<tr>
                                        <th width="row">${index + 1}</th>
                                        <td>${value.inputName}</td>
                                        <td>
                                            <p class="show-text">${value.inputDesc}</p>
                                        </td>
                                        <td> 
                                            <a target="_blank" href="/new-gp-page/main-page/images/yojana/${value.image}" class="text-danger">माहिती PDF</a>
                                        </td>
                                        <td><button class="btn btn-sm btn-danger"><span class="fa fa-trash"></span></button></td>
                                    </tr>`;
        }).join('')
        $('#modalGramMahitiSixImageList').html(list)
    }
    printModalGramMahitiSixList();

    $('#modalGramMahitiSixSaveBtn').on('click', function () {

        var inputName = $('#modalGramMahitiSixInputName').val();
        var inputDesc = $('#modalGramMahitiSixInputDesc').val();

        var input = $('#modalGramMahitiSixInputFile')[0].files[0];
        if (inputName === "" || inputDesc === "") {
            alert('Enter All Input Fields');
            return false;
        }
        if (input === undefined) {
            alert('select file');
            return false;
        }
        $('#modalGramMahitiSixSaveBtn').prop('disabled', true);
        var ext = input.name.lastIndexOf('.');
        ext = input.name.substr(ext + 1)
        if (ext === 'pdf') {
            var formData = new FormData();
            formData.append('inputName', inputName);
            formData.append('inputDesc', inputDesc);
            formData.append('image', input)
            formData.append('list', JSON.stringify(modalGramMahitiSixList))
            $.ajax({
                url: '/master/upload/modalGramMahitiSixList',
                method: "post",
                processData: false,
                contentType: false,
                cache: false,
                data: formData,
            })
                .done(function (data) {
                    modalGramMahitiSixList.push({
                        inputName,
                        inputDesc,
                        image: data.newName
                    });
                    printModalGramMahitiSixList();
                    alert('शासकीय माहीती जतन केले.');
                    $('#modalGramMahitiSixInputName').val('');
                    $('#modalGramMahitiSixInputDesc').val('');
                    $('#modalGramMahitiSixInputFile').val('');
                    $('#modalGramMahitiSixSaveBtn').prop('disabled', false);
                })
                .fail(function (error) {
                    alert(error)
                    console.log(error);
                    $('#modalGramMahitiSixSaveBtn').prop('disabled', false);
                });
        } else {
            alert('Only pdf file allow.');
            return false
        }
    })
})                    
