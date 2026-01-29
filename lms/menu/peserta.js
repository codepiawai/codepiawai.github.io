var peserta={
model:{
host:'http://localhost/piawai/api/lms/peserta.php',
table:{id:'users',data:[
  {id:1,nama:"user1",isi:1},
  {id:2,nama:"user2",isi:2},
]},},

controller:{
view:function(){
  d.service.host=peserta.model.host;

  d.service.param={t:'peserta', mod:'table',nama:'users'};
  d.service.get(callback);
  function callback(json){ res=JSON.parse(json);
  table.data=res.data;
  d.controller.view()
  }

  },
},




};
