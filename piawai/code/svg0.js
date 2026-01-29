var svg={
coba:function(){alert('svg')},
json:{id:'svg',data:[
{canvas:'0 0 100 150', item:[
{nama:'person',posisi:'0 20'},
{nama:'person',posisi:'0 50'},
{nama:'ellipse',posisi:'50 0'},
{nama:'ellipse',posisi:'50 55'},
{nama:'ellipse',posisi:'50 100'},
{nama:'line',posisi:'M24 36 48 12'},
{nama:'line',posisi:'M24 36 48 114'},
{nama:'line',posisi:'M24 66 48 66'},
{nama:'line',posisi:'M24 66 48 114'},
{nama:'text',posisi:'75 14',text:'purchas'},
{nama:'text',posisi:'75 70',text:'sale'},
{nama:'text',posisi:'75 114',text:'login'},
]},
{canvas:'0 0 100 200', item:[
{nama:'terminal',posisi:'20 0'},
{nama:'process',posisi:'20 30'},
{nama:'decision',posisi:'20 60'},
{nama:'process',posisi:'20 90'},
{nama:'process',posisi:'20 120'},
{nama:'terminal',posisi:'20 150'},
{nama:'line',posisi:'M32 20 32 30'},
{nama:'line',posisi:'M32 50 32 54'},
{nama:'line',posisi:'M32 85 32 90'},
{nama:'line',posisi:'M32 110 32 120'},
{nama:'line',posisi:'M32 140 32 145 0 145 0 72 10 72'},
{nama:'line',posisi:'M52 72 56 72 56 148 32 148 32 150 '},
{nama:'text',posisi:'25 14',text:'start'},
{nama:'text',posisi:'25 164',text:'end'},
]},

]},

path:{
gradien:`<defs>
<linearGradient id="gradient" x1="50%" y1="-2.48949813e-15%" x2="50%" y2="100%" >
<stop stop-color="#5757D9" offset="0%"/>
<stop stop-color="#21D9F7" offset="100%"/>
</linearGradient>
</defs>`,
filter:`M4 21 4 14M4 10 4 3M12 21 12 12M12 8 12 3M20 21 20 16M20 12 20 3M1 14 7 14M9 8 15 8M17 16 23 16`,
person:`M4 22V19A4 4 0 017 15H17A4 4 0 0120 19V22M7 7A4 4 0 0017 7 4 4 0 007 7`,
house:`M20 10v11a2 2 0 01-2 2H6a2 2 0 01-2-2V10M9 22V12h6v10M2 10 12 2l10 8`,
threedots:`M11 12a1 1 0 102 0 1 1 0 10-2 0M11 5a1 1 0 102 0 1 1 0 10-2 0M11 19a1 1 0 102 0 1 1 0 10-2 0`,
menu:`M3 12 21 12M3 6 21 6M3 18 21 18`,
trush:`M19 6V20A2 2 0 0117 22H7A2 2 0 015 20V6M8 6V4A2 2 0 0110 2H14A2 2 0 0116 4V6M3 6 5 6 21 6M10 11 10 17M14 11 14 17`,
check:`M20 6 9 17 4 12`,
x:`M18 6 6 18 M6 6 18 18`,
plus:`M2 12a10 10 0 1020 0 10 10 0 10-20 0M12 8 12 16M8 12 16 12`,
printer:`M6 9V2H18V9M6 18H4A2 2 0 012 16V11A2 2 0 014 9H20A2 2 0 0122 11V16A2 2 0 0120 18H18M6 14H18V22H6Z`,
pen:`M16 3 21 8 8 21 3 21 3 16 16 3`,
chart:`M2 2V20H22M20 7 17 10 12 5 4 18`,
cart:`M2 2h3l3 12a2 2 0 002 2h8a2 2 0 002-1l2-8H7.1M9 20a1 1 0 002 0 1 1 0 00-2 0M17 20a1 1 0 002 0 1 1 0 00-2 0`,
card:`M5 16H7M2 9H22M2 5H22V19H2Z`,
envelope:`M4 4H20C20 4 22 4 22 6V18C22 20 21 20 20 20H4C2.9 20 2 20 2 18V6C2 5 2 4 4 4ZM22 6 12 13 2 6`,
geo:`M9 10a3 3 0 106 0 3 3 0 10-6 0M12 22s-8-5-8-12A8 8 0 0112 2a8 8 0 018 8c0 7-8 12-8 12z`,
twitter:`M23 3A11 11 0 0120 4 4 4 0 0012 7V8A10 10 0 013 4S1 14 8 17A12 12 0 011 19C10 24 21 19 21 8A4.5 4.5 0 0021 7 8 8 0 0023 3Z`,
facebook:`M17 2H14A5 5 0 009 7V10H6V14H9V22H13V14H16L17 10H13V7A1 1 0 0114 6H17Z`,
whatsapp:`M20 11A8 8 0 018 18L3 21 5 15A8 8 0 014 11 1 1 0 0120 11Z`,
eye:`M1 12S5 4 12 4S23 12 23 12S19 20 12 20S1 12 1 12ZM9 12A3 3 0 1 0 15 12A3 3 0 1 0 9 12`,
qrcode:`M3 3h7v7H3Z M14 3h7v7H14Z M14 14h7v7H14Z M3 14h7v7H3Z`,
search:`M20 12A1 1 0 004 12 1 1 0 0020 12M22 22 18 18`,
minus:`M2,12a10,10 0 1,0 20,0a10,10 0 1,0 -20,0 M8 12 16 12`,
bayam:`M1 18 1 6A1 1 0 0111 6L11 13 18 13A1 1 0 0118 23L6 23 6 6A1 1 0 0116 6L16 8 18 8A1 1 0 0118 18Z`,
scan:`M8 3H5A2 2 0 0 0 3 5V8M21 8V5A2 2 0 0 0 19 3H16M16 21H19A2 2 0 0 0 21 19V16M3 16V19A2 2 0 0 0 5 21H8`,
upload:`M3 15V19A2 2 0 005 21H19A2 2 0 0021 19V15M17 8 12 3 7 8M12 3V14`,
download:`M3 15V19A2 2 0 005 21H19A2 2 0 0021 19V15M17 9 12 14 7 9M12 14V3`,
camera:`M22 20A2 2 0 0120 22H4A2 2 0 012 20V7A2 2 0 014 5H7L9 2H15L17 5H20A2 2 0 0122 7V20M7 12A1 1 0 0017 12 1 1 0 007 12`,
bel:`M22 17H2A3 3 0 005 14V9A7 7 0 0119 9V14A3 3 0 0022 17ZM14 20A2 2 0 0110 20`,
lock:`M4 11H20S22 11 22 13V20S22 22 20 22H4S2 22 2 20V13S2 11 4 11M7 11V7A5 5 0 0117 7V11`,
setting:`M9 12A3 3 0 1015 12 3 3 0 109 12M21 14A1.65 1.65 0 0020 17 2 2 0 0117 20 1.65 1.65 0 0014 21 2 2 0 0110 21 1.65 1.65 0 007 20 2 2 0 014 17 1.65 1.65 0 003 14 2 2 0 013 10 1.65 1.65 0 004 7 2 2 0 017 4 1.65 1.65 0 0010 3 2 2 0 0114 3 1.65 1.65 0 0017 4 2 2 0 0120 7 1.65 1.65 0 0021 10 2 2 0 0121 14Z`,

terminal:`M5 7Q1 7 1 11L1 13Q1 17 5 17L19 17Q23 17 23 13L23 11Q23 7 19 7Z`,
process:`M1 7 1 17 23 17 23 7Z`,
decision:`M12 23 1 12 12 1 23 12Z`,
io:`M5 7 1 17 19 17 23 7Z`,
connector:`M18 12A1 1 0 006 12 1 1 0 0018 12Z`,
ellipse:`M1 12C1 22 23 22 23 12 23 2 1 2 1 12`,
calendar:`M 2 5 Q 2 3 4 3 A 1 1 0 0 1 6 3 L 18 3 A 1 1 0 0 1 20 3 Q 22 3 22 5 L 22 19 Q 22 22 19 22 L 5 22 Q 2 22 2 19 Z M 4 8 L 20 8 L 20 19 A 1 1 0 0 1 19 20 L 5 20 A 1 1 0 0 1 4 19 Z`,
cit:`M 12 22 A 1 1 0 0 0 12 2 A 1 1 0 0 0 12 22 Z Z M 12 17 C 20 14 17 5 12 10 C 7 5 4 14 12 17 Z Z Z`,

},

html:function(){
var {data}=svg.json;
out=``;
for (i in data) {
var {mode,item,canvas}=data[i];
out+=`${b[x].svg.js.diagram(canvas,item)}`;
}
return out;
}, // end view icons

js:{
view:function(id='bayam'){
var {path}=svg;
log(path)
out='';
for(i in path){ log(i)
out+=this.svg(this.path(i));
}
return out;
},
icon:function(id='bayam'){
  var {path}=svg;
  // ${path.gradien}
return `<svg class="svgicon" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24">
 ${this.path(id)}</svg>`;
},

diagram:function(canvas='0 0 200 200',item){
out=`<svg class="svgdiagram" xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="${canvas}">`;
for (e in item) { node=item[e]; p=node.posisi; p=p.split(' ');

if(node.nama=='text'){ out+=`<text x=${p[0]} y=${p[1]} >${node.text}</text>`;}

else if(node.nama=='line'){
out+=`<marker id='panah' refX='0' refY='2' markerWidth='4' markerHeight='4'orient='auto'><path d='M0 0 4 2 0 4Z' /></marker>
<path d="${node.posisi}" marker-end='url(#panah)' />`; }

else { out+=`<svg x=${p[0]} y=${p[1]} >${b[x].svg.js.path(node.nama)}</svg>`;}

} // end for
out+=`</svg>`;
return out;
},

path:function(id='bayam'){
var {path}=svg;
return `<path id="path${id}" d="${path[id]}"  />`;
},

line:function(id='M0 0 L24 24'){
return `<path d="${id}" />`;
},


list:function(){
var {path}=svg;
for(key in path ){
list = document.getElementsByClassName("bi-"+key);
// alert(list)
if(list.length > 0){
for (var i=0 ; i<list.length; i++){ list[i].innerHTML = svg.js.icon(key);}
}
}


}, // end list


icons:function(){
var {data}=svg.json;
function icon(id='house'){
return `<svg id="svg${id}" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24"
stroke-width="1" stroke-linecap="round" stroke-linejoin="round"
fill="none" stroke="#fff"
>
<path id="path${id}" d="${data[id]}" />
</svg>`;
};

for(key in data ){
list = document.getElementsByClassName("bi-"+key);
if(list.length > 0){
for (var i=0 ; i<list.length; i++){ list[i].innerHTML = icon(key);
}}}
}, // end load icons


},// end js
}; // end svg

svg.js.list();
