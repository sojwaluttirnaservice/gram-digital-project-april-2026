var responderSet = require("../config/_responderSet");
var fs = require("fs");
var resultStatus = responderSet.checkResult;
var connetion_info = require("../config/connect.config");
const mysqldump = require("mysqldump");

module.exports = {
  checkAdminLoginAuth: function (pool, aouth_data) {
    return new Promise((resolve, reject) => {
      var query =
        "SELECT id as admin_id, a_code as cc , a_center_name as c_name FROM aouth " +
        " WHERE a_master_name = ? AND a_master_password = ?";

      pool.query(
        query,
        [aouth_data.user_name, aouth_data.password],
        (err, result) => {
          if (err) {
            (responderSet.sendData._call = -1),
              (responderSet.sendData._error = "Op Error, Contact To Admin"),
              (responderSet.sendData._sys_erorr = err),
              reject(responderSet.sendData);
          } else {
            resolve(result);
          }
        },
      );
    });
  },
  getPublishTestList: function (pool) {
    return new Promise((resolve, reject) => {
      var query = "SELECT * FROM tm_publish_test_list";
      pool.query(query, (err, result) => {
        if (err) {
          (responderSet.sendData._call = -1),
            (responderSet.sendData._error = "Op Error, Contact To Admin"),
            (responderSet.sendData._sys_erorr = err),
            reject(responderSet.sendData);
        } else {
          resolve(result);
        }
      });
    });
  },
  getDonePublishTestList: function (pool) {
    return new Promise((resolve, reject) => {
      var query =
        "SELECT * FROM tm_publish_test_list WHERE ptl_is_test_done = 1";
      pool.query(query, (err, result) => {
        if (err) {
          (responderSet.sendData._call = -1),
            (responderSet.sendData._error = "Op Error, Contact To Admin"),
            (responderSet.sendData._sys_erorr = err),
            reject(responderSet.sendData);
        } else {
          resolve(result);
        }
      });
    });
  },
  getSinglePublishInfo: function (pool, pub_id) {
    return new Promise((resolve, reject) => {
      var query =
        "SELECT " +
        "mt_name as exam_name," +
        "mt_test_time as exam_duration," +
        "mt_total_test_question as exam_total_question, " +
        "tm_allow_to  as batch_no" +
        "FROM tm_publish_test_list WHERE id = ?";
      pool.query(query, [pub_id], (err, result) => {
        if (err) {
          (responderSet.sendData._call = -1),
            (responderSet.sendData._error = "Op Error, Contact To Admin"),
            (responderSet.sendData._sys_erorr = err),
            reject(responderSet.sendData);
        } else {
          resolve(result);
        }
      });
    });
  },
  cleanPublish: function (pool, id) {
    return new Promise((resolve, reject) => {
      var query = "DELETE FROM tm_publish_test_list WHERE id = ?";
      pool.query(query, [id], (err, result) => {
        if (err) {
          (responderSet.sendData._call = -1),
            (responderSet.sendData._error = "Op Error, Contact To Admin"),
            (responderSet.sendData._sys_erorr = err),
            reject(responderSet.sendData);
        } else {
          resolve(result);
        }
      });
    });
  },
  addPublishList: function (pool, publish_data) {
    return new Promise((resolve, reject) => {
      if (publish_data.length > 0) {
        var insert_array = [];
        var query =
          "INSERT INTO tm_publish_test_list(id, ptl_active_date," +
          "ptl_time, ptl_link, ptl_link_1, ptl_test_id, ptl_master_exam_id, " +
          "ptl_master_exam_name, ptl_added_date, ptl_added_time, ptl_time_tramp, " +
          "ptl_test_description, ptl_is_live, ptl_aouth_id, ptl_is_test_done, ptl_test_info, " +
          "mt_name, mt_added_date, mt_descp, mt_is_live, mt_time_stamp, mt_type, tm_aouth_id, " +
          "mt_test_time, mt_total_test_takan, mt_is_negative, mt_negativ_mark, mt_mark_per_question, " +
          "mt_passing_out_of, mt_total_marks, mt_pattern_type, mt_total_test_question, mt_added_time, " +
          "mt_pattern_name, is_test_generated,ptl_test_mode, tm_allow_to, is_test_loaded, is_student_added) VALUES ?";

        publish_data.forEach(function (value, index, main_array) {
          $data = [
            value.id,
            value.ptl_active_date,
            value.ptl_time,
            value.ptl_link,
            value.ptl_link_1,
            value.ptl_test_id,
            value.ptl_master_exam_id,
            value.ptl_master_exam_name,
            value.ptl_added_date,
            value.ptl_added_time,
            value.ptl_time_tramp,
            value.ptl_test_description,
            value.ptl_is_live,
            value.ptl_aouth_id,
            value.ptl_is_test_done,
            value.ptl_test_info,
            value.mt_name,
            value.mt_added_date,
            value.mt_descp,
            value.mt_is_live,
            value.mt_time_stamp,
            value.mt_type,
            value.tm_aouth_id,
            value.mt_test_time,
            value.mt_total_test_takan,
            value.mt_is_negative,
            value.mt_negativ_mark,
            value.mt_mark_per_question,
            value.mt_passing_out_of,
            value.mt_total_marks,
            value.mt_pattern_type,
            value.mt_total_test_question,
            value.mt_added_time,
            value.mt_pattern_name,
            value.is_test_generated,
            value.ptl_test_mode,
            value.tm_allow_to,
            value.is_test_loaded,
            value.is_test_unloaded,
          ];
          insert_array.push($data);
        });
        pool.query(query, [insert_array], function (err, result) {
          if (err) {
            (responderSet.sendData._call = -1),
              (responderSet.sendData._error = "Op Error, Contact To Admin"),
              (responderSet.sendData._sys_erorr = err),
              reject(responderSet.sendData);
          } else {
            resolve(result);
          }
        });
      } else {
        reject({ call: 0 });
      }
    });
  },
  addAuthDetails: function (pool, details) {
    return new Promise((resolve, reject) => {
      if (details.length > 0) {
        var insert_array = [];
        var query =
          "INSERT INTO aouth(id, a_app_code,a_code, " +
          "a_center_name,a_center_address,a_master_name,a_master_password) " +
          " VALUES ?";

        details.forEach(function (value, index, main_array) {
          $data = [
            value.id,
            value.a_app_code,
            value.a_app_code,
            value.a_center_name,
            value.a_center_address,
            value.a_master_name,
            value.a_master_password,
          ];
          insert_array.push($data);
        });
        pool.query(query, [insert_array], function (err, result) {
          if (err) {
            (responderSet.sendData._call = -1),
              (responderSet.sendData._error = "Op Error, Contact To Admin"),
              (responderSet.sendData._sys_erorr = err),
              reject(responderSet.sendData);
          } else {
            resolve(result);
          }
        });
      } else {
        reject({ call: 0 });
      }
    });
  },
  cleanAuthDetails: function (pool) {
    return new Promise((resolve, reject) => {
      var query = "DELETE FROM aouth";
      pool.query(query, (err, result) => {
        if (err) {
          (responderSet.sendData._call = -1),
            (responderSet.sendData._error = "Op Error, Contact To Admin"),
            (responderSet.sendData._sys_erorr = err),
            reject(responderSet.sendData);
        } else {
          resolve(result);
        }
      });
    });
  },
  cleanStudent: function (pool, list_info) {
    return new Promise((resolve, reject) => {
      var query =
        "DELETE FROM tn_student_list WHERE sl_center_code = ? AND sl_batch_no = ? ";
      pool.query(
        query,
        [list_info.center_code, list_info.batch_list],
        (err, result) => {
          if (err) {
            (responderSet.sendData._call = -1),
              (responderSet.sendData._error = "Op Error, Contact To Admin"),
              (responderSet.sendData._sys_erorr = err),
              reject(responderSet.sendData);
          } else {
            resolve(result);
          }
        },
      );
    });
  },
  addBatchToList: function (pool, batch_to_publish) {
    return new Promise(function (resolve, reject) {
      if (batch_to_publish.length > 0) {
        var insert_array = [];
        var query =
          "INSERT INTO tn_student_list " +
          "(id,sl_f_name,sl_m_name,sl_l_name,sl_image,sl_sign,sl_email," +
          "sl_father_name,sl_mother_name,sl_address, sl_mobile_number_parents," +
          "sl_tenth_marks,sl_contact_number,sl_class,sl_roll_number,sl_subject," +
          "sl_stream,sl_addmit_type,sl_time,sl_date,sl_time_stamp,sl_added_by_login_id," +
          "sl_is_live,sl_date_of_birth,sl_school_name,sl_catagory,sl_application_number," +
          "sl_is_physical_handicap,sl_is_physical_handicap_desc,sl_post,sl_center_code," +
          "sl_batch_no,sl_exam_date,sl_password) VALUES ?";

        batch_to_publish.forEach(function (value, index, main_array) {
          $data = [
            value.id,
            value.sl_f_name,
            value.sl_m_name,
            value.sl_l_name,
            value.sl_image,
            value.sl_sign,
            value.sl_email,
            value.sl_father_name,
            value.sl_mother_name,
            value.sl_address,
            value.sl_mobile_number_parents,
            value.sl_tenth_marks,
            value.sl_contact_number,
            value.sl_class,
            value.sl_roll_number,
            value.sl_subject,
            value.sl_stream,
            value.sl_addmit_type,
            value.sl_time,
            value.sl_date,
            value.sl_time_stamp,
            value.sl_added_by_login_id,
            value.sl_is_live,
            value.sl_date_of_birth,
            value.sl_school_name,
            value.sl_catagory,
            value.sl_application_number,
            value.sl_is_physical_handicap,
            value.sl_is_physical_handicap_desc,
            value.sl_post,
            value.sl_center_code,
            value.sl_batch_no,
            value.sl_exam_date,
            value.sl_password,
          ];

          insert_array.push($data);
        });
        pool.query(query, [insert_array], function (err, result) {
          if (err) {
            (responderSet.sendData._call = -1),
              (responderSet.sendData._error = "Op Error, Contact To Admin"),
              (responderSet.sendData._sys_erorr = err),
              reject(responderSet.sendData);
          } else {
            resolve(result);
          }
        });
      } else {
        reject({ call: 0 });
      }
    });
  },
  loadExam: function (pool, pub_id) {
    return new Promise((resolve, reject) => {
      var query =
        "UPDATE tm_publish_test_list SET is_start_exam = 1 WHERE id  = ?";
      pool.query(query, [pub_id], (err, result) => {
        if (err) {
          (responderSet.sendData._call = -1),
            (responderSet.sendData._error = "Op Error, Contact To Admin"),
            (responderSet.sendData._sys_erorr = err),
            reject(responderSet.sendData);
        } else {
          resolve(result);
        }
      });
    });
  },
  startExamSession: function (pool, pub_id) {
    return new Promise((resolve, reject) => {
      var query =
        "UPDATE tm_publish_test_list SET is_test_loaded = 1 WHERE id  = ?";
      pool.query(query, [pub_id], (err, result) => {
        if (err) {
          (responderSet.sendData._call = -1),
            (responderSet.sendData._error = "Op Error, Contact To Admin"),
            (responderSet.sendData._sys_erorr = err),
            reject(responderSet.sendData);
        } else {
          resolve(result);
        }
      });
    });
  },
  markAsAbsent: function (pool, exam_details) {
    return new Promise(function (resolve, reject) {
      var query =
        "UPDATE tn_student_list SET " +
        " sl_present_status = 0 " +
        " WHERE " +
        " sl_batch_no = ? AND sl_present_status = 2";
      var qData = [exam_details.batch_no];
      pool.query(query, qData, function (err, update_result) {
        if (err) {
          (responderSet.sendData._call = 0),
            (responderSet.sendData._error = "Op Error, Contact To Admin"),
            (responderSet.sendData._sys_erorr = err),
            reject(responderSet.sendData);
        } else {
          resolve(update_result);
        }
      });
    });
  },
  updateTestAsAbsent: function (pool, exam_details) {
    return new Promise(function (resolve, reject) {
      var query =
        "UPDATE tm_publish_test_list SET " +
        " is_absent_mark = 1 " +
        " WHERE " +
        " id = ? ";
      var qData = [exam_details.pub_id];
      pool.query(query, qData, function (err, update_result) {
        if (err) {
          (responderSet.sendData._call = 0),
            (responderSet.sendData._error = "Op Error, Contact To Admin"),
            (responderSet.sendData._sys_erorr = err),
            reject(responderSet.sendData);
        } else {
          resolve(update_result);
        }
      });
    });
  },
  markStudentAttendace: function (pool, stud_id) {
    return new Promise((resolve, reject) => {
      var query =
        "UPDATE tn_main_student_list SET sl_is_present = 1 WHERE sl_roll_number  = ?";
      pool.query(query, [stud_id], (err, result) => {
        if (err) {
          (responderSet.sendData._call = -1),
            (responderSet.sendData._error = "Op Error, Contact To Admin"),
            (responderSet.sendData._sys_erorr = err),
            reject(responderSet.sendData);
        } else {
          resolve(result);
        }
      });
    });
  },
  getSingleStudentDetails: function (pool, stud_id) {
    return new Promise((resolve, reject) => {
      var query =
        "SELECT " +
        "CONCAT(sl_f_name,' ',sl_m_name,' ',sl_l_name) as student_name," +
        "sl_contact_number as contact_number," +
        "sl_roll_number as application_id ," +
        "DATE_FORMAT(sl_date_of_birth,'%d-%m-%Y') as dob," +
        "IF(sl_exam_type = 1,'PCM',IF(sl_exam_type = 2,'PCB','PCMB')) as stream," +
        "sl_password as pas_key  FROM tn_main_student_list WHERE sl_roll_number = ? LIMIT 1";
      pool.query(query, [stud_id], (err, result) => {
        if (err) {
          (responderSet.sendData._call = -1),
            (responderSet.sendData._error = "Op Error, Contact To Admin"),
            (responderSet.sendData._sys_erorr = err),
            reject(responderSet.sendData);
        } else {
          resolve(result);
        }
      });
    });
  },
  getExamStudentList: function (pool, pub_id) {
    return new Promise((resolve, reject) => {
      var query =
        "SELECT " +
        "CONCAT(sl_f_name,' ',sl_m_name,' ',sl_l_name) as student_name," +
        "sl_contact_number as contact_number," +
        "sl_roll_number as application_id ," +
        "DATE_FORMAT(sl_date_of_birth,'%d-%m-%Y') as dob," +
        "IF(sl_exam_type = 1,'PCM',IF(sl_exam_type = 2,'PCB','PCMB')) as stream," +
        "sl_password as pas_key,IF(sl_is_present = 1,'Present','Absent') as attendance FROM tn_main_student_list WHERE sl_publish_id = ?";
      pool.query(query, [pub_id], (err, result) => {
        if (err) {
          (responderSet.sendData._call = -1),
            (responderSet.sendData._error = "Op Error, Contact To Admin"),
            (responderSet.sendData._sys_erorr = err),
            reject(responderSet.sendData);
        } else {
          resolve(result);
        }
      });
    });
  },
  getBatchStudentList: function (pool, list_info) {
    return new Promise((resolve, reject) => {
      var query =
        "SELECT " +
        "CONCAT(sl_f_name,' ',sl_m_name,' ',sl_l_name) as student_name," +
        "sl_contact_number as contact_number," +
        "sl_roll_number as roll_number," +
        "DATE_FORMAT(sl_date_of_birth,'%d-%m-%Y') as dob," +
        "sl_password  as password," +
        "sl_application_number as application_number ," +
        "IF(sl_present_status = 2,'<label  class=\"btn-primary btn-xs\">Alloted</label>'," +
        "IF(sl_present_status = 1,'<label  class=\"btn-success btn-xs\">Present</label>'," +
        "'<label  class=\"btn-danger btn-xs\">Absent</label>')) as student_status " +
        "FROM tn_student_list WHERE sl_center_code = ? AND sl_batch_no = ?";
      pool.query(
        query,
        [list_info.center_code, list_info.batch_list],
        (err, result) => {
          if (err) {
            (responderSet.sendData._call = -1),
              (responderSet.sendData._error = "Op Error, Contact To Admin"),
              (responderSet.sendData._sys_erorr = err),
              reject(responderSet.sendData);
          } else {
            resolve(result);
          }
        },
      );
    });
  },
  addBatchToList: function (pool, batch_to_publish) {
    return new Promise(function (resolve, reject) {
      if (batch_to_publish.length > 0) {
        var insert_array = [];
        var query =
          "INSERT INTO tn_student_list " +
          "(id,sl_f_name,sl_m_name,sl_l_name,sl_image,sl_sign,sl_email," +
          "sl_father_name,sl_mother_name,sl_address, sl_mobile_number_parents," +
          "sl_tenth_marks,sl_contact_number,sl_class,sl_roll_number,sl_subject," +
          "sl_stream,sl_addmit_type,sl_time,sl_date,sl_time_stamp,sl_added_by_login_id," +
          "sl_is_live,sl_date_of_birth,sl_school_name,sl_catagory,sl_application_number," +
          "sl_is_physical_handicap,sl_is_physical_handicap_desc,sl_post,sl_center_code," +
          "sl_batch_no,sl_exam_date,sl_password) VALUES ?";

        batch_to_publish.forEach(function (value, index, main_array) {
          $data = [
            value.id,
            value.sl_f_name,
            value.sl_m_name,
            value.sl_l_name,
            value.sl_image,
            value.sl_sign,
            value.sl_email,
            value.sl_father_name,
            value.sl_mother_name,
            value.sl_address,
            value.sl_mobile_number_parents,
            value.sl_tenth_marks,
            value.sl_contact_number,
            value.sl_class,
            value.sl_roll_number,
            value.sl_subject,
            value.sl_stream,
            value.sl_addmit_type,
            value.sl_time,
            value.sl_date,
            value.sl_time_stamp,
            value.sl_added_by_login_id,
            value.sl_is_live,
            value.sl_date_of_birth,
            value.sl_school_name,
            value.sl_catagory,
            value.sl_application_number,
            value.sl_is_physical_handicap,
            value.sl_is_physical_handicap_desc,
            value.sl_post,
            value.sl_center_code,
            value.sl_batch_no,
            value.sl_exam_date,
            value.sl_password,
          ];

          insert_array.push($data);
        });
        pool.query(query, [insert_array], function (err, result) {
          if (err) {
            (responderSet.sendData._call = -1),
              (responderSet.sendData._error = "Op Error, Contact To Admin"),
              (responderSet.sendData._sys_erorr = err),
              reject(responderSet.sendData);
          } else {
            resolve(result);
          }
        });
      } else {
        reject({ call: 0 });
      }
    });
  },
  updateAddedStudentExam: function (pool, pub_id) {
    /*return new Promise((resolve,reject) => {
                var query = "UPDATE tm_publish_test_list SET is_student_added = 1 WHERE id  = ?";
                pool.query(query,[pub_id],(err, result)=> {
                    if(err){
                            responderSet.sendData._call = -1,
                            responderSet.sendData._error = 'Op Error, Contact To Admin',
                            responderSet.sendData._sys_erorr = err,
                            reject(responderSet.sendData);
                    }else{
                        resolve(result);
                    }
                });
            });*/
  },
  addTestInfo: function (pool, test_info) {
    return new Promise(function (resolve, reject) {
      if (test_info.length > 0) {
        var insert_array = [];
        var query =
          "INSERT INTO tm_test_user_master_list ( id , mt_test_for , mt_name , " +
          " mt_added_date , mt_descp , mt_added_time , mt_is_live , mt_time_stamp , " +
          " mt_type , tm_aouth_id , mt_test_time , mt_total_test_takan , " +
          " mt_is_negative , mt_negativ_mark , mt_mark_per_question , " +
          " mt_passing_out_of , mt_total_marks , mt_pattern_type , mt_pattern_name, " +
          " mt_total_test_question ) VALUES ?";

        test_info.forEach(function (value, index, main_array) {
          $data = [
            value.id,
            value.mt_test_for,
            value.mt_name,
            value.mt_added_date,
            value.mt_descp,
            value.mt_added_time,
            value.mt_is_live,
            value.mt_time_stamp,
            value.mt_type,
            value.tm_aouth_id,
            value.mt_test_time,
            value.mt_total_test_takan,
            value.mt_is_negative,
            value.mt_negativ_mark,
            value.mt_mark_per_question,
            value.mt_passing_out_of,
            value.mt_total_marks,
            value.mt_pattern_type,
            value.mt_pattern_name,
            value.mt_total_test_question,
          ];
          insert_array.push($data);
        });

        pool.query(query, [insert_array], function (err, result) {
          if (err) {
            (responderSet.sendData._call = -1),
              (responderSet.sendData._error = "Op Error, Contact To Admin"),
              (responderSet.sendData._sys_erorr = err),
              reject(responderSet.sendData);
          } else {
            resolve(result);
          }
        });
      } else {
        reject({ call: 0 });
      }
    });
  },
  cleanQuestionPaper: function (pool, id) {
    return new Promise((resolve, reject) => {
      var query = "DELETE FROM tm_test_question_sets WHERE tqs_test_id  = ?";
      pool.query(query, [id], (err, result) => {
        if (err) {
          (responderSet.sendData._call = -1),
            (responderSet.sendData._error = "Op Error, Contact To Admin"),
            (responderSet.sendData._sys_erorr = err),
            reject(responderSet.sendData);
        } else {
          resolve(result);
        }
      });
    });
  },
  addQuestionPaper: function (pool, question_set) {
    return new Promise(function (resolve, reject) {
      if (question_set.length > 0) {
        var insert_array = [];
        var query =
          "INSERT INTO tm_test_question_sets ( id ,  q_id , " +
          " tqs_test_id ,  section_id ,  section_name ,  sub_topic_id ,  sub_topic_section , " +
          " main_topic_id ,  main_topic_name ,  q ,  q_a ,  q_b ,  q_c ,  q_d ,  q_e ,  q_display_type , " +
          " q_ask_in ,  q_data_type ,  q_mat_data , q_col_a ,  q_col_b ,  q_mat_id ,  q_i_a ,  q_i_b , " +
          " q_i_c ,  q_i_d ,  q_i_e ,  q_i_q ,  q_i_sol ,  stl_topic_number ,  sl_section_no ,  q_sol , " +
          " q_ans ,  q_mat_ans ,  q_mat_ans_row ,  q_col_display_type ,  question_no ) VALUES ?";

        question_set.forEach(function (value, index, main_array) {
          $data = [
            value.id,
            value.q_id,
            value.tqs_test_id,
            value.section_id,
            value.section_name,
            value.sub_topic_id,
            value.sub_topic_section,
            value.main_topic_id,
            value.main_topic_name,
            value.q,
            value.q_a,
            value.q_b,
            value.q_c,
            value.q_d,
            value.q_e,
            value.q_display_type,
            value.q_ask_in,
            value.q_data_type,
            value.q_mat_data,
            value.q_col_a,
            value.q_col_b,
            value.q_mat_id,
            value.q_i_a,
            value.q_i_b,
            value.q_i_c,
            value.q_i_d,
            value.q_i_e,
            value.q_i_q,
            value.q_i_sol,
            value.stl_topic_number,
            value.sl_section_no,
            value.q_sol,
            value.q_ans,
            value.q_mat_ans,
            value.q_mat_ans_row,
            value.q_col_display_type,
            value.question_no,
          ];
          insert_array.push($data);
        });
        pool.query(query, [insert_array], function (err, result) {
          if (err) {
            (responderSet.sendData._call = -1),
              (responderSet.sendData._error = "Op Error, Contact To Admin"),
              (responderSet.sendData._sys_erorr = err),
              reject(responderSet.sendData);
          } else {
            resolve(result);
          }
        });
      } else {
        reject({ call: 0 });
      }
    });
  },
  createDbBackup: function (pool, data) {
    return new Promise(function (resolve, reject) {
      var today = new Date();
      var date =
        today.getDate() +
        "" +
        (today.getMonth() + 1) +
        "" +
        today.getFullYear() +
        "_" +
        today.getHours() +
        "" +
        today.getMinutes() +
        "" +
        today.getSeconds();
      var file_path =
        connetion_info.connetion_details.db_save_path +
        data.cc +
        "_batch_" +
        data.batch_no +
        "_" +
        date +
        "_backup.sql";
      mysqldump({
        connection: {
          host: connetion_info.connetion_details.host,
          user: connetion_info.connetion_details.user,
          password: connetion_info.connetion_details.password,
          database: connetion_info.connetion_details.database,
        },
        dumpToFile: file_path,
      });
      resolve(file_path);
    });
  },
  updateExamIsDone: function (pool, data) {
    return new Promise((resolve, reject) => {
      var query =
        "UPDATE tm_publish_test_list SET  ptl_is_test_done  = 1 WHERE id  = ?";
      pool.query(query, [data.pub_id], (err, result) => {
        if (err) {
          (responderSet.sendData._call = -1),
            (responderSet.sendData._error = "Op Error, Contact To Admin"),
            (responderSet.sendData._sys_erorr = err),
            reject(responderSet.sendData);
        } else {
          resolve(result);
        }
      });
    });
  },
  updateExamIsGen: function (pool, data) {
    return new Promise((resolve, reject) => {
      var query =
        "UPDATE tm_publish_test_list SET  is_test_generated = 1 WHERE id  = ?";
      pool.query(query, [data.pub_id], (err, result) => {
        if (err) {
          (responderSet.sendData._call = -1),
            (responderSet.sendData._error = "Op Error, Contact To Admin"),
            (responderSet.sendData._sys_erorr = err),
            reject(responderSet.sendData);
        } else {
          resolve(result);
        }
      });
    });
  },
  RemoveThisExamData: function (pool, info_data) {
    return new Promise(function (resolve, reject) {
      pool.beginTransaction(function (err) {
        if (err) {
          reject(err);
        }
        var query =
          "DELETE FROM tm_student_question_paper WHERE sqp_publish_id   = ?";
        pool.query(
          query,
          [info_data.pub_id],
          function (error, results, fields) {
            if (error) {
              pool.rollback(function () {
                (responderSet.sendData._call = -1),
                  (responderSet.sendData._error = "Op Error, Contact To Admin"),
                  (responderSet.sendData._sys_erorr = error),
                  reject(responderSet.sendData);
              });
            } else {
              var query =
                "DELETE FROM tm_student_test_list WHERE stl_publish_id   = ?";
              pool.query(
                query,
                [info_data.pub_id],
                function (error, results, fields) {
                  if (error) {
                    pool.rollback(function () {
                      (responderSet.sendData._call = -1),
                        (responderSet.sendData._error =
                          "Op Error, Contact To Admin"),
                        (responderSet.sendData._sys_erorr = error),
                        reject(responderSet.sendData);
                    });
                  } else {
                    pool.commit(function (err) {
                      if (err) {
                        pool.rollback(function () {
                          (responderSet.sendData._call = -1),
                            (responderSet.sendData._error =
                              "Op Error, Contact To Admin"),
                            (responderSet.sendData._sys_erorr = err),
                            reject(responderSet.sendData);
                        });
                      }
                      resolve(results);
                    });
                  }
                },
              );
            }
          },
        );
      });
    });
  },
  RemoveOldExamData: function (pool, info_data) {
    return new Promise(function (resolve, reject) {
      pool.beginTransaction(function (err) {
        if (err) {
          reject(err);
        }
        var query =
          "DELETE FROM tm_final_student_question_paper WHERE sqp_publish_id   = ?";
        pool.query(
          query,
          [info_data.pub_id],
          function (error, results, fields) {
            if (error) {
              pool.rollback(function () {
                (responderSet.sendData._call = -1),
                  (responderSet.sendData._error = "Op Error, Contact To Admin"),
                  (responderSet.sendData._sys_erorr = error),
                  reject(responderSet.sendData);
              });
            } else {
              var query =
                "DELETE FROM tm_final_student_test_list WHERE stl_publish_id   = ?";
              pool.query(
                query,
                [info_data.pub_id],
                function (error, results, fields) {
                  if (error) {
                    pool.rollback(function () {
                      (responderSet.sendData._call = -1),
                        (responderSet.sendData._error =
                          "Op Error, Contact To Admin"),
                        (responderSet.sendData._sys_erorr = error),
                        reject(responderSet.sendData);
                    });
                  } else {
                    pool.commit(function (err) {
                      if (err) {
                        pool.rollback(function () {
                          (responderSet.sendData._call = -1),
                            (responderSet.sendData._error =
                              "Op Error, Contact To Admin"),
                            (responderSet.sendData._sys_erorr = err),
                            reject(responderSet.sendData);
                        });
                      }
                      resolve(results);
                    });
                  }
                },
              );
            }
          },
        );
      });
    });
  },
  loadStudentListBackToFinal: function (pool, info_data) {
    return new Promise(function (resolve, reject) {
      pool.beginTransaction(function (err) {
        if (err) {
          reject(err);
        }
        pool.query(
          "INSERT INTO tm_final_student_test_list  SELECT * FROM tm_student_test_list WHERE stl_publish_id=?",
          [info_data.pub_id],
          function (error, results, fields) {
            if (error) {
              pool.rollback(function () {
                (responderSet.sendData._call = -1),
                  (responderSet.sendData._error = "Op Error, Contact To Admin"),
                  (responderSet.sendData._sys_erorr = error),
                  reject(responderSet.sendData);
              });
            } else {
              if (results.insertId == 0) {
                resolve({ call: 2 });
              }
              pool.query(
                "INSERT INTO tm_final_student_question_paper  SELECT * FROM tm_student_question_paper WHERE sqp_publish_id = ?",
                [info_data.pub_id],
                function (error, results, fields) {
                  if (error) {
                    pool.rollback(function () {
                      (responderSet.sendData._call = -1),
                        (responderSet.sendData._error =
                          "Op Error, Contact To Admin"),
                        (responderSet.sendData._sys_erorr = error),
                        reject(responderSet.sendData);
                    });
                  } else {
                    pool.commit(function (err) {
                      if (err) {
                        pool.rollback(function () {
                          (responderSet.sendData._call = -1),
                            (responderSet.sendData._error =
                              "Op Error, Contact To Admin"),
                            (responderSet.sendData._sys_erorr = err),
                            reject(responderSet.sendData);
                        });
                      } else {
                        if (results.insertId == 0) {
                          resolve({ call: 2 });
                        } else {
                          resolve({ call: 1 });
                        }
                      }
                    });
                  }
                },
              );
            }
          },
        );
      });
    });
  },
  loadStudentQuestionListBackToFinal: function () {
    var query =
      "INSERT INTO tm_final_student_question_paper  SELECT * FROM tm_student_question_paper";
    pool.query(query, [insert_array], function (err, result) {
      if (err) {
        (responderSet.sendData._call = -1),
          (responderSet.sendData._error = "Op Error, Contact To Admin"),
          (responderSet.sendData._sys_erorr = err),
          reject(responderSet.sendData);
      } else {
        resolve(result);
      }
    });
  },
  getLiveExamStatus: function (pool) {
    return new Promise((resolve, reject) => {
      var query =
        "SELECT " +
        "CONCAT(sl_f_name,' ',sl_m_name,' ',sl_l_name) as student_name, " +
        "sl_roll_number as roll_no, " +
        "DATE_FORMAT(sl_date_of_birth,'%d-%m-%Y') as dob, " +
        "stl_test_status as test_status, " +
        "IF(stl_agrement_accepted = 0,'Not Accepted','Accepted') as aggrement_status_1, " +
        "CONCAT(stm_min,':',stm_sec) as time_remain " +
        "FROM tn_student_list as msl INNER JOIN tm_student_test_list stl " +
        "ON stl.stl_stud_id = msl.id";

      pool.query(query, (err, result) => {
        if (err) {
          (responderSet.sendData._call = -1),
            (responderSet.sendData._error = "Op Error, Contact To Admin"),
            (responderSet.sendData._sys_erorr = err),
            reject(responderSet.sendData);
        } else {
          resolve(result);
        }
      });
    });
  },
  getExamLockStatus: function (pool) {
    return new Promise((resolve, reject) => {
      var query =
        "SELECT " +
        "CONCAT(sl_f_name,' ',sl_m_name,' ',sl_l_name) as student_name, " +
        "sl_roll_number as roll_no, " +
        "DATE_FORMAT(sl_date_of_birth,'%d-%m-%Y') as dob " +
        "FROM tn_student_list as msl INNER JOIN utr_student_attendance stl " +
        "ON stl.student_id = msl.id";

      pool.query(query, (err, result) => {
        if (err) {
          (responderSet.sendData._call = -1),
            (responderSet.sendData._error = "Op Error, Contact To Admin"),
            (responderSet.sendData._sys_erorr = err),
            reject(responderSet.sendData);
        } else {
          resolve(result);
        }
      });
    });
  },
  addclearUnlockUserLog: function (pool, details) {
    return new Promise((resolve, reject) => {
      let date_ob = new Date();
      let date = ("0" + date_ob.getDate()).slice(-2);
      let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
      let year = date_ob.getFullYear();
      let hours = date_ob.getHours();
      let minutes = date_ob.getMinutes();
      let seconds = date_ob.getSeconds();
      var time_stamp =
        year +
        "-" +
        month +
        "-" +
        date +
        " " +
        hours +
        ":" +
        minutes +
        ":" +
        seconds;

      var insert_array = [];
      var query =
        "INSERT INTO utr_unlock_list(ul_student_id,ul_unlock_cause,ul_time_stamp) " +
        " VALUES ?";
      $data = [details.stud_id, details.cause, time_stamp];
      insert_array.push($data);
      pool.query(query, [insert_array], function (err, result) {
        if (err) {
          (responderSet.sendData._call = -1),
            (responderSet.sendData._error = "Op Error, Contact To Admin"),
            (responderSet.sendData._sys_erorr = err),
            reject(responderSet.sendData);
        } else {
          resolve(result);
        }
      });
    });
  },
  clearUnlockOneUser: function (pool, student_id) {
    return new Promise((resolve, reject) => {
      var query = "DELETE FROM utr_student_attendance WHERE student_id = ?";
      pool.query(query, [student_id], (err, result) => {
        if (err) {
          (responderSet.sendData._call = -1),
            (responderSet.sendData._error = "Op Error, Contact To Admin"),
            (responderSet.sendData._sys_erorr = err),
            reject(responderSet.sendData);
        } else {
          resolve(result);
        }
      });
    });
  },
  clearTableRecored: function (pool, table_name) {
    return new Promise((resolve, reject) => {
      var query = "DELETE FROM " + table_name;
      pool.query(query, (err, result) => {
        if (err) {
          (responderSet.sendData._call = -1),
            (responderSet.sendData._error = "Op Error, Contact To Admin"),
            (responderSet.sendData._sys_erorr = err),
            reject(responderSet.sendData);
        } else {
          resolve(result);
        }
      });
    });
  },
  clearExamFormPublish: function (pool, pub_id) {
    return new Promise((resolve, reject) => {
      var query = "DELETE FROM tm_publish_test_list WHERE id = ?";
      pool.query(query, [pub_id], (err, result) => {
        if (err) {
          (responderSet.sendData._call = -1),
            (responderSet.sendData._error = "Op Error, Contact To Admin"),
            (responderSet.sendData._sys_erorr = err),
            reject(responderSet.sendData);
        } else {
          resolve(result);
        }
      });
    });
  },
  clearExamFormStudentList: function (pool, batch_no) {
    return new Promise((resolve, reject) => {
      var query = "DELETE FROM tn_student_list WHERE sl_batch_no = ?";
      pool.query(query, [batch_no], (err, result) => {
        if (err) {
          (responderSet.sendData._call = -1),
            (responderSet.sendData._error = "Op Error, Contact To Admin"),
            (responderSet.sendData._sys_erorr = err),
            reject(responderSet.sendData);
        } else {
          resolve(result);
        }
      });
    });
  },
  clearExamFormStudentTestList: function (pool, pub_id) {
    return new Promise((resolve, reject) => {
      var query =
        "DELETE FROM tm_final_student_test_list WHERE stl_publish_id = ?";
      pool.query(query, [pub_id], (err, result) => {
        if (err) {
          (responderSet.sendData._call = -1),
            (responderSet.sendData._error = "Op Error, Contact To Admin"),
            (responderSet.sendData._sys_erorr = err),
            reject(responderSet.sendData);
        } else {
          resolve(result);
        }
      });
    });
  },
  clearExamFormStudentQuestionPaper: function (pool, pub_id) {
    return new Promise((resolve, reject) => {
      var query =
        "DELETE FROM tm_final_student_question_paper WHERE sqp_publish_id = ?";
      pool.query(query, [pub_id], (err, result) => {
        if (err) {
          (responderSet.sendData._call = -1),
            (responderSet.sendData._error = "Op Error, Contact To Admin"),
            (responderSet.sendData._sys_erorr = err),
            reject(responderSet.sendData);
        } else {
          resolve(result);
        }
      });
    });
  },
  getDoneExamsStudentExamData: function (pool, pub_id) {
    return new Promise((resolve, reject) => {
      var query =
        "SELECT IFNULL(added_time,0) as added_time," +
        "IFNULL(sqp_ans,'') as sqp_ans,IFNULL(sqp_index_value,'') as sqp_index_value," +
        "IFNULL(sqp_is_remark,0) as sqp_is_remark,IFNULL(sqp_min,0) as sqp_min," +
        "sqp_publish_id,sqp_question_id," +
        "IFNULL(sqp_sec,0) as sqp_sec,sqp_student_id,sqp_test_id,IFNULL(sqp_time,0) as sqp_time " +
        "FROM tm_final_student_question_paper WHERE sqp_publish_id = ?";
      pool.query(query, [pub_id], (err, result) => {
        if (err) {
          (responderSet.sendData._call = -1),
            (responderSet.sendData._error = "Op Error, Contact To Admin"),
            (responderSet.sendData._sys_erorr = err),
            reject(responderSet.sendData);
        } else {
          resolve(result);
        }
      });
    });
  },
  updatePublishExamUploaded: function (pool, pub_id) {
    return new Promise((resolve, reject) => {
      var query =
        "UPDATE tm_publish_test_list SET is_uploaded = 1 WHERE id  = ?";
      pool.query(query, [pub_id], (err, result) => {
        if (err) {
          (responderSet.sendData._call = -1),
            (responderSet.sendData._error = "Op Error, Contact To Admin"),
            (responderSet.sendData._sys_erorr = err),
            reject(responderSet.sendData);
        } else {
          resolve({ call: 1, data: result });
        }
      });
    });
  },
  getDoneExamsStudentListData: function (pool, pub_id) {
    return new Promise((resolve, reject) => {
      var query =
        "SELECT stl_agrement_accepted,IFNULL(stl_browser_info,'') as stl_browser_info, stl_date, stl_publish_id," +
        "stl_stud_id,stl_test_compliet_in,stl_test_id, stl_test_status," +
        "IFNULL(stl_test_submition_time,'') as stl_test_submition_time," +
        "IFNULL(stl_test_url,'') as stl_test_url, stl_time,stl_time_stamp," +
        "IFNULL(stl_user_ip, '') as stl_user_ip, stm_min, stm_sec FROM " +
        "tm_final_student_test_list WHERE stl_publish_id = ?";

      pool.query(query, [pub_id], (err, result) => {
        if (err) {
          (responderSet.sendData._call = -1),
            (responderSet.sendData._error = "Op Error, Contact To Admin"),
            (responderSet.sendData._sys_erorr = err),
            reject(responderSet.sendData);
        } else {
          resolve(result);
        }
      });
    });
  },
  updateMasterIP: function (pool, data) {
    return new Promise((resolve, reject) => {
      data =
        "var ip_adress = { host: '" +
        data.ipAdress +
        "'}; exports.ip_adress = ip_adress;";
      fs.writeFile("ip_data.js", data, function (err) {
        if (err) {
          (responderSet.sendData._call = -1),
            (responderSet.sendData._error = "Op Error, Contact To Admin"),
            (responderSet.sendData._sys_erorr = err),
            reject(responderSet.sendData);
        } else {
          resolve(true);
        }
      });
    });
  },
  uploadResultPerBatch: function (cURLConf, request, send_data) {
    return new Promise((resolve, reject) => {
      request.post(
        {
          url: cURLConf.CURL_link.upload_exam_link,
          body: JSON.stringify(send_data),
        },
        function (error, response, body) {
          if (typeof response === "undefined") {
            resolve({ call: 999 });
          } else {
            if (!error && response.statusCode == 200) {
              var json = JSON.parse(body);
              if (typeof json.call !== "undefined") {
                if (body.call == 0) {
                  resolve({ call: 3, data: body.data });
                } else {
                  resolve({ call: 1 });
                }
              } else {
                resolve({ call: 3, data: body });
              }
            } else {
              resolve({ call: 3, data: body });
            }
          }
        },
      );
    });
  },
};
