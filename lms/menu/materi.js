var materi={
model:{
// host:'http://localhost/piawai/api/lms/materi.php',
host:'http://localhost/lms/api/materi.php',

id_kursus:2,

table:{id:'users',data:[
  {id:1,nama:"user1",isi:1},
  {id:2,nama:"user2",isi:2},
]},

}, //end model

controller:{
view:function(){
  id_kursus=d.model.edit.induk;
  log(d.model.edit.induk)

  d.service.host=materi.model.host;
  d.service.param={t:'materi', mod:'materi',nama:id_kursus};
  d.service.get(callback);
  function callback(json){ res=JSON.parse(json);
  table.data=res.data;
  d.controller.view();
  d.close('modal');

  }

  },
}, // end controller




};
