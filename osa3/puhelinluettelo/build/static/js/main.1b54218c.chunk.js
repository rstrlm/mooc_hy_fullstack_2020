(this.webpackJsonppuhelinluettelo=this.webpackJsonppuhelinluettelo||[]).push([[0],{15:function(e,n,t){e.exports=t(38)},37:function(e,n,t){},38:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),o=t(14),u=t.n(o),c=t(4),l=t(2),i=function(e){var n=e.value,t=e.onChange;return r.a.createElement("div",null,"filter shown with ",r.a.createElement("input",{value:n,onChange:t,placeholder:"search for..."}))},m=function(e){var n=e.onSubmit,t=e.name,a=e.nameChange,o=e.number,u=e.numberChange;return r.a.createElement("form",{onSubmit:n},r.a.createElement("div",null,"name: ",r.a.createElement("input",{value:t,onChange:a,placeholder:"name..."})),r.a.createElement("div",null,"number: ",r.a.createElement("input",{value:o,onChange:u,placeholder:"number..."})),r.a.createElement("div",null,r.a.createElement("button",{type:"submit"},"add")))},s=function(e){var n=e.person,t=e.removePerson;return r.a.createElement("p",null,n.name," ",n.number," ",r.a.createElement("button",{onClick:function(){return t(n.id)}},"delete"))},f=function(e){var n=e.filter,t=e.persons,a=e.removePerson,o=n.length>0?t.filter((function(e){return-1!==e.name.toLowerCase().indexOf(n.toLowerCase())})):t;return r.a.createElement("div",null,o.map((function(e){return r.a.createElement(s,{key:e.name,person:e,removePerson:a})})))},d=t(3),h=t.n(d),b="/api/persons",v=function(){return h.a.get(b).then((function(e){return e.data}))},p=function(e){return h.a.post(b,e).then((function(e){return e.data}))},E=function(e,n){return h.a.put("".concat(b,"/").concat(e),n).then((function(e){return e.data}))},w=function(e){return h.a.delete("".concat(b,"/").concat(e)).then((function(e){return e.data}))},g=(t(37),function(){var e=Object(a.useState)([]),n=Object(l.a)(e,2),t=n[0],o=n[1],u=Object(a.useState)(""),s=Object(l.a)(u,2),d=s[0],h=s[1],b=Object(a.useState)(""),g=Object(l.a)(b,2),C=g[0],O=g[1],j=Object(a.useState)(""),S=Object(l.a)(j,2),y=S[0],L=S[1],k=Object(a.useState)(null),P=Object(l.a)(k,2),T=P[0],N=P[1],x=Object(a.useState)(!0),D=Object(l.a)(x,2),J=D[0],B=D[1];Object(a.useEffect)((function(){v().then((function(e){o(e)}))}),[]);var I=function(e){var n=e.message,t=e.status;return null===n?null:t?r.a.createElement("div",{className:"notification"},n):r.a.createElement("div",{className:"error"},n)};return r.a.createElement("div",null,r.a.createElement("h2",null,"Phonebook"),r.a.createElement(I,{message:T,status:J}),r.a.createElement(i,{value:y,onChange:function(e){L(e.target.value)}}),r.a.createElement("h2",null,"add a new"),r.a.createElement(m,{onSubmit:function(e){e.preventDefault();var n={name:d,number:C};if(t.filter((function(e){return e.name.toLowerCase()===d.toLowerCase()})).length>0){var a=t.find((function(e){return e.name.toLowerCase()===d.toLowerCase()})),r=Object(c.a)(Object(c.a)({},a),{},{number:C});window.confirm("".concat(a.name," is already on the list, do you want to replace the old number with a new one?"))&&E(a.id,r).then((function(e){o(t.map((function(n){return n.id!==a.id?n:e}))),B(!0),N("".concat(a.name," number changed to ").concat(a.number)),setTimeout((function(){N(null)}),4e3),h(""),O("")})).catch((function(e){B(!1),N("Note '".concat(a.name,"' was already removed from server")),setTimeout((function(){N(null)}),4e3),o(t.filter((function(e){return e.id!==a.id})))}))}else p(n).then((function(e){o(t.concat(e)),B(!0),N("".concat(d," has been added to the list")),setTimeout((function(){N(null)}),4e3),h(""),O(""),h(""),O("")})).catch((function(e){B(!1),N("Error: ".concat(e.response.data.error)),setTimeout((function(){N(null)}),4e3)}))},name:d,nameChange:function(e){h(e.target.value)},number:C,numberChange:function(e){O(e.target.value)}}),r.a.createElement("h2",null,"Numbers"),r.a.createElement(f,{filter:y,persons:t,removePerson:function(e){var n=t.find((function(n){return n.id===e}));window.confirm("Do you want to remove ".concat(n.name," from the list"))&&w(e).then((function(){o(t.filter((function(n){return n.id!==e}))),N("Removed ".concat(n.name," from the list")),setTimeout((function(){N(null)}),4e3)}))}}))});u.a.render(r.a.createElement(g,null),document.getElementById("root"))}},[[15,1,2]]]);
//# sourceMappingURL=main.1b54218c.chunk.js.map