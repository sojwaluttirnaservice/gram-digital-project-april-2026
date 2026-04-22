var snapMale = "";
var memberImage = "";

$(document).ready(function () {
  $("#image_1").on("change", function (e) {
    snapMale = "";
    $("#image-1-preview").prop("src", snapMale);
    var input = $(this)[0];
    memberImage = input.files[0];
    var fileName = $(this).val().split("\\").pop();
    extension = fileName.substring(fileName.lastIndexOf(".") + 1);

    if (
      extension == "jpeg" ||
      extension == "JPEG" ||
      extension == "jpg" ||
      extension == "JPG"
    ) {
      if (input.files && input.files[0]) {
        if (input.files[0].size > 524288) {
          alert("Try to upload file less than 512KB!");
          $(this).val("");

          e.preventDefault();
        } else {
          $(this)
            .siblings(".custom-file-label")
            .addClass("selected")
            .html(fileName);
          var reader = new FileReader();
          reader.onload = function (e) {
            $("#image-1-preview").prop("src", e.target.result);
            // uploadImage();
          };
          reader.readAsDataURL(input.files[0]); // convert to base64 string
        }
      }
    } else {
      alert("फक्त JPEG किंवा JPG फोटो पाहिजे आणि size 1 MB पर्यंत");
      $(this).val("");
    }
  });

  $(document).on("click", ".galleryAddModel", function (e) {
    e.preventDefault();
    var data = Number($(this).attr("data-id"));
    $("#image_1").val("");
    memberImage = "";
    $("#image-1-preview").prop("src", "");
    $("#progress").addClass("d-none");
    $("#memberName").val("");
    $("#marriageModel").modal({
      show: true,
    });
    $(".modal-title").html("नवीन सदस्य जोडा");
    member.printPostList(function (list) {
      list.unshift('<option value="-1">---- SELECT ----</option>');
      $("#memberType").html(list);
    });
    member.printToList(function (list) {
      list.unshift('<option value="-1">---- SELECT ----</option>');
      $("#memberTo").html(list);
    });
  });

  $(document).on("click", ".removeImage", function (e) {
    var id = Number($(this).data("id"));
    var image_name = member.sList[id].image;
    deleteImage({ image: image_name }, function (status, data) {
      if (!status) {
        alert(data);
        return false;
      }
      member.sList.splice(id, 1);
      member.updateList(function () {
        member.printMember(function (list) {
          $("#sadasyaList").html(list);
        });
      });
    });
  });
  $(document).on("click", "#saveMember", function (e) {
    e.preventDefault();
    var newFormMember = $("#newFormMember")[0];
    var formData = new FormData(newFormMember);
    formData.append("memberImage", memberImage);

    if (formData.get("memberName") == "") {
      alert("सदस्य नाव आवशक");
      return false;
    }
    if (formData.get("memberType") == "-1") {
      alert("सदस्य पद आवशक");
      return false;
    }
    if (formData.get("memberTo") == "-1") {
      alert("Section आवशक");
      return false;
    }
    if (formData.get("memberImage") == "") {
      alert("सदस्य छायाचित्र आवशक");
      return false;
    }
    $("#saveMember").prop("disabled", true);
    uploadImage(formData, function (status, data) {
      if (!status) {
        alert(data);
        $("#saveMember").prop("disabled", false);
        return false;
      }
      var p_id = formData.get("memberType");
      var p_name = member.sPost.filter(function (post) {
        return post.id == p_id;
      });
      var to_id = formData.get("memberTo");
      var to_name = member.sTo.filter(function (to) {
        return to.id == to_id;
      });

      this.sTo = [];
      var sendData = {
        name: formData.get("memberName"),
        post: Number(formData.get("memberType")),
        section: Number(formData.get("memberTo")),
        p_name: p_name[0].post_name,
        s_name: to_name[0].to_name,
        image: data.data,
        sadasyaInfo: formData.get('sadasyaInfo')
      };
      member.sList.push(sendData);
      member.updateList(function (status) {
        if (!status) {
          alert("Unable to update list");
          $("#saveMember").prop("disabled", false);
          return false;
        }
        member.printMember(function (list) {
          $("#saveMember").prop("disabled", false);
          $("#sadasyaList").html(list);
          $("#marriageModel").modal("hide");
          $("#memberName").val("");
        });
      });
    });
  });
  function uploadImage(formData, callback) {
    $.ajax({
      url: "/master/manage-gp/upload-image",
      enctype: "multipart/form-data",
      processData: false, // Important!
      contentType: false,
      cache: false,
      method: "post",
      data: formData,
      error: function () {
        callback(false, "Your are having server issue");
      },
      success: function (data) {
        callback(true, data);
      },
    });
  }
  function deleteImage(formData, callback) {
    $.ajax({
      url: "/master/manage-gp/delete-image",
      method: "post",
      data: formData,
      error: function () {
        callback(false, "Your are having server issue");
      },
      success: function (data) {
        callback(true, data);
      },
    });
  }
});
var member = new Member();
function Member() {
  const _this = this;
  this.sList = [];
  this.sPost = [];
  this.sTo = [];
  this.printPostList = function (callback) {
    var list = this.sPost.map(function (post) {
      return `<option value="${post.id}">${post.post_name}</option>`;
    });
    callback(list);
  };
  this.printToList = function (callback) {
    var list = this.sTo.map(function (to) {
      return `<option value="${to.id}">${to.to_name}</option>`;
    });
    callback(list);
  };
  this.printMember = function (callback) {
    var list = this.sList.map(function (image, index) {
      return `<div class="col-2 gallery-image single-user" id="${index}"> 
                <div class="gallery-image-div">
                <span class="removeImage fa fa-trash text-danger float-right" data-id=${index} style="cursor: pointer;"></span>
                <img class="img img-thumbnail" src="/gp/asstes/images/team/${image.image}" style="width:200px !important; height:200px" />
                <p>${image.s_name}</p>
                </div>
                <p class="text-danger gallery-text"><i> ${image.p_name} </i></p>
                <p class="text-primary gallery-text">${image.name}</p>
                
              </div>`;
    });
    callback(list);
  };

  this.updateList = function (callback) {
    var sendData = {
      url: "/master/manage-gp/update-member",
      method: "post",
      data: {
        member: JSON.stringify(_this.sList),
      },
    };
    this.ajaxPromise(sendData)
      .then(function (data) {
        callback(true);
      })
      .catch(function (error) {
        console.error(error);
        alert("server error");
        callback(false);
      });
  };
  this.ajaxPromise = function (configData) {
    return new Promise(function (resolve, reject) {
      ajax(configData, function (status, data) {
        if (status) resolve(data);
        else reject(data);
      });
    });
  };
  function ajax(configData, callback) {
    $.ajax(configData)
      .done(function (data) {
        callback(true, data);
      })
      .fail(function (error) {
        callback(false, error);
      });
  }
}
