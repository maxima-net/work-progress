(this["webpackJsonpwork-progress"]=this["webpackJsonpwork-progress"]||[]).push([[0],{2:function(e){e.exports=JSON.parse('{"urls":{"home":"/","unpaid":"/unpaid","invoiced":"/invoiced","paid":"/paid","settings":"/settings"},"localStorageKeys":{"trelloApiKey":"trelloApiKey","trelloApiToken":"trelloApiToken","payPalClientId":"payPalClientId","payPalSecret":"payPalSecret"},"labelsId":{"paid":"5f4cdb937afb6a829d4ad8f4","invoiced":"5f4cdb937afb6a829d4ad8fe"},"trelloLists":{"inQueueListId":"5f4cdb937afb6a829d4ad8e6","inProgressListId":"5f4cdb937afb6a829d4ad8e7","inRevisionListId":"5f4cdb937afb6a829d4ad8ea","completedListId":"5f4cdb937afb6a829d4ad8e8","sentToClientListId":"5f4cdb937afb6a829d4ad8e9"}}')},29:function(e,t,n){},30:function(e,t,n){},40:function(e,t,n){"use strict";n.r(t);var c=n(1),a=n.n(c),r=n(23),s=n.n(r),i=(n(29),n(30),n(3)),l=n(17),o=n.n(l),d=n(0),u=function(e){return Object(d.jsx)("div",{className:"card bg-light bg-gradient",children:Object(d.jsxs)("div",{className:"card-body",children:[Object(d.jsxs)("h6",{className:"card-subtitle mb-2",children:[e.title," ",Object(d.jsx)("span",{className:"badge bg-primary",style:{float:"right"},children:e.badge})]}),Object(d.jsx)("h5",{className:"card-title text-success",children:e.isLoading?"Loading...":Object(d.jsxs)(d.Fragment,{children:[Object(d.jsx)(o.a,{prefix:"$",separator:",",end:e.value}),e.altCurrencyRatio&&Object(d.jsxs)(d.Fragment,{children:[Object(d.jsx)("span",{children:" / "}),Object(d.jsx)(o.a,{suffix:" \u20bd",separator:",",end:e.value*e.altCurrencyRatio})]})]})}),Object(d.jsx)("p",{className:"card-text",children:e.isLoading?"Loading...":e.children})]})})},b=function(e){var t=a.a.useState(localStorage.getItem(e)||""),n=Object(i.a)(t,2),c=n[0],r=n[1];return a.a.useEffect((function(){localStorage.setItem(e,c)}),[c]),[c,r]},j=n(2),h=n(4),m=n(6),p=function(e,t,n,c){return fetch("https://api.trello.com/1/lists/".concat(e,"/cards?key=").concat(t,"&token=").concat(n,"&customFieldItems=true")).then((function(e){return e.json()})).then((function(e){return c(e.filter((function(e){var t,n;return null===(t=e.customFieldItems[0])||void 0===t||null===(n=t.value)||void 0===n?void 0:n.number})))}))},O=function(e){return fetch("https://api.exchangeratesapi.io/latest?&base=USD&symbols=RUB").then((function(e){return e.json()})).then((function(t){e(t.rates.RUB)}))},f=function(e,t,n,c){return fetch("https://api.trello.com/1/cards/".concat(e,"/idLabels?key=").concat(n,"&token=").concat(c,"&value=").concat(t),{method:"POST"})},x=function(e,t,n,c){return fetch("https://api.trello.com/1/cards/".concat(e,"/idLabels/").concat(t,"?key=").concat(n,"&token=").concat(c),{method:"DELETE"})},v=function(e,t){var n=btoa("".concat(e,":").concat(t)),c=new Headers;c.append("Authorization","Basic ".concat(n)),c.append("Content-Type","application/x-www-form-urlencoded");var a=new URLSearchParams;return a.append("grant_type","client_credentials"),fetch("https://api-m.paypal.com/v1/oauth2/token",{method:"POST",headers:c,body:a,redirect:"follow"}).then((function(e){return e.json()})).then((function(e){return e.access_token}))},g=function(e){var t=new Headers;return t.append("Authorization","Bearer ".concat(e)),t.append("Content-Type","application/json"),fetch("https://api.paypal.com/v2/invoicing/templates/TEMP-0XJ98350B9132814N",{method:"GET",headers:t,redirect:"follow"}).then((function(e){return e.json()}))},y=function(e,t,n){var c=new Headers;c.append("Authorization","Bearer ".concat(e)),c.append("Content-Type","application/json");var a=t.template_info.items[0].name,r=t.template_info;r.items=n.map((function(e){return{name:a,description:S(e),unit_amount:{currency_code:"USD",value:e.customFieldItems[0].value.number},quantity:1}}));var s={method:"POST",headers:c,body:JSON.stringify(r),redirect:"follow"};return fetch("https://api.paypal.com/v2/invoicing/invoices",s).then((function(e){return e.json()}))},N=function(e,t){var n=t.exec(e);return n&&n[1]?n[1].trim():""},S=function(e){var t=N(e.desc,/Order Number:(.+)$/gm),n=N(e.desc,/Order Type:(.+)$/gm),c="";return c+=t?"Order Number: ".concat(t," (").concat(n||e.name,")"):"Order Number: ".concat(e.name," (").concat(e.desc.split("\n")[0],")")},I=function(e){return e.reduce((function(e,t){return e+ +t.customFieldItems[0].value.number}),0)},k=function(){var e=b(j.localStorageKeys.trelloApiKey),t=Object(i.a)(e,1)[0],n=b(j.localStorageKeys.trelloApiToken),a=Object(i.a)(n,1)[0],r=Object(h.f)();t&&a||r.push(j.urls.settings);var s=Object(c.useState)(!1),l=Object(i.a)(s,2),o=l[0],f=l[1],x=Object(c.useState)(void 0),v=Object(i.a)(x,2),g=v[0],y=v[1],N=Object(c.useState)([]),S=Object(i.a)(N,2),k=S[0],C=S[1],w=Object(c.useState)([]),P=Object(i.a)(w,2),L=P[0],T=P[1],A=Object(c.useState)([]),K=Object(i.a)(A,2),R=K[0],F=K[1],E=Object(c.useState)([]),U=Object(i.a)(E,2),B=U[0],_=U[1],D=Object(c.useState)([]),M=Object(i.a)(D,2),H=M[0],J=M[1];Object(c.useEffect)((function(){O((function(e){return y(e)}))}),[]),Object(c.useEffect)((function(){if(t&&a){var e=p(j.trelloLists.inQueueListId,t,a,(function(e){return C(e.filter((function(e){return"5f4cdb937afb6a829d4ad8f2"!==e.id})))})),n=p(j.trelloLists.inProgressListId,t,a,(function(e){return T(e)})),c=p(j.trelloLists.completedListId,t,a,(function(e){return F(e)})),r=p(j.trelloLists.inRevisionListId,t,a,(function(e){return _(e)})),s=p(j.trelloLists.sentToClientListId,t,a,(function(e){return J(e)}));Promise.all([e,n,c,r,s]).then((function(){return f(!0)}))}}),[t,a]);var $=I(k),z=I(L),Q=I(R),W=I(B),q=I(H),G=H.filter((function(e){return!e.labels||!e.labels.length})),X=I(G),V=H.filter((function(e){return e.labels&&e.labels.some((function(e){return e.id===j.labelsId.invoiced}))})),Y=I(V),Z=H.filter((function(e){return e.labels&&e.labels.some((function(e){return e.id===j.labelsId.paid}))})),ee=I(Z),te=Math.max(100-X,0),ne=o?0===te?"Ready":"Earn more $".concat(te):"";return Object(d.jsxs)("div",{className:"container",children:[Object(d.jsxs)("div",{className:"row gy-3",children:[Object(d.jsx)("div",{className:"col-lg",children:Object(d.jsx)(u,{title:"Unpaid",value:X,isLoading:!o,altCurrencyRatio:g,badge:ne,children:Object(d.jsxs)(m.b,{to:j.urls.unpaid,className:"card-link link-dark",children:[G.length," drawing(s)"]})})}),Object(d.jsx)("div",{className:"col-lg",children:Object(d.jsx)(u,{title:"Invoiced",value:Y,isLoading:!o,altCurrencyRatio:g,children:Object(d.jsxs)(m.b,{to:j.urls.invoiced,className:"card-link link-dark",children:[V.length," drawing(s)"]})})}),Object(d.jsx)("div",{className:"col-lg",children:Object(d.jsx)(u,{title:"Paid",value:ee,isLoading:!o,altCurrencyRatio:g,children:Object(d.jsxs)(m.b,{to:j.urls.paid,className:"card-link link-dark",children:[Z.length," drawing(s)"]})})}),Object(d.jsx)("div",{className:"col-lg",children:Object(d.jsxs)(u,{title:"Total",value:q,isLoading:!o,altCurrencyRatio:g,children:[H.length," drawing(s)"]})})]}),Object(d.jsx)("br",{}),Object(d.jsxs)("div",{className:"row gy-3",children:[Object(d.jsx)("div",{className:"col-lg",children:Object(d.jsxs)(u,{title:"In Queue",value:$,isLoading:!o,altCurrencyRatio:g,children:[k.length," drawing(s)"]})}),Object(d.jsx)("div",{className:"col-lg",children:Object(d.jsxs)(u,{title:"In Progress",value:z,isLoading:!o,altCurrencyRatio:g,children:[L.length," drawing(s)"]})}),Object(d.jsx)("div",{className:"col-lg",children:Object(d.jsxs)(u,{title:"Completed",value:Q,isLoading:!o,altCurrencyRatio:g,children:[R.length," drawing(s)"]})}),Object(d.jsx)("div",{className:"col-lg",children:Object(d.jsxs)(u,{title:"In Revision",value:W,isLoading:!o,altCurrencyRatio:g,children:[B.length," drawing(s)"]})})]})]})},C=function(){return Object(d.jsxs)("header",{className:"d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-body border-bottom shadow-sm",children:[Object(d.jsx)("p",{className:"h5 my-0 me-md-auto fw-normal",children:"Work Progress"}),Object(d.jsxs)("nav",{className:"my-2 my-md-0 me-md-3",children:[Object(d.jsx)(m.b,{className:"p-2 text-dark",to:j.urls.home,children:"Analytics"}),Object(d.jsx)(m.b,{className:"p-2 text-dark",to:j.urls.unpaid,children:"Unpaid"}),Object(d.jsx)(m.b,{className:"p-2 text-dark",to:j.urls.invoiced,children:"Invoiced"}),Object(d.jsx)(m.b,{className:"p-2 text-dark",to:j.urls.paid,children:"Paid"}),Object(d.jsx)(m.b,{className:"p-2 text-dark",to:j.urls.settings,children:"Settings"})]})]})},w=function(){var e=b(j.localStorageKeys.trelloApiKey),t=Object(i.a)(e,2),n=t[0],c=t[1],a=b(j.localStorageKeys.trelloApiToken),r=Object(i.a)(a,2),s=r[0],l=r[1],o=b(j.localStorageKeys.payPalClientId),u=Object(i.a)(o,2),m=u[0],p=u[1],O=b(j.localStorageKeys.payPalSecret),f=Object(i.a)(O,2),x=f[0],v=f[1],g=Object(h.f)();return Object(d.jsxs)("div",{className:"container",children:[Object(d.jsx)("h1",{children:"Settings"}),Object(d.jsx)("div",{className:"row",style:{maxWidth:600},children:Object(d.jsxs)("form",{onSubmit:function(e){e.preventDefault(),g.push(j.urls.home)},children:[Object(d.jsxs)("div",{className:"mb-3",children:[Object(d.jsx)("label",{htmlFor:"trelloApiKey",className:"form-label",children:"Trello API Key"}),Object(d.jsx)("input",{type:"text",className:"form-control",id:"trelloApiKey","aria-describedby":"emailHelp",value:n,onChange:function(e){c(e.target.value)}})]}),Object(d.jsxs)("div",{className:"mb-3",children:[Object(d.jsx)("label",{htmlFor:"trelloApiToken",className:"form-label",children:"Trello API Token"}),Object(d.jsx)("input",{type:"text",className:"form-control",id:"trelloApiToken",value:s,onChange:function(e){l(e.target.value)}})]}),Object(d.jsxs)("div",{className:"mb-3",children:[Object(d.jsx)("label",{htmlFor:"payPalClientId",className:"form-label",children:"PayPal Client Id"}),Object(d.jsx)("input",{type:"text",className:"form-control",id:"payPalClientId","aria-describedby":"emailHelp",value:m,onChange:function(e){p(e.target.value)}})]}),Object(d.jsxs)("div",{className:"mb-3",children:[Object(d.jsx)("label",{htmlFor:"payPalSecret",className:"form-label",children:"PayPal Secret"}),Object(d.jsx)("input",{type:"text",className:"form-control",id:"payPalSecret",value:x,onChange:function(e){v(e.target.value)}})]}),Object(d.jsx)("button",{type:"submit",className:"btn btn-primary",children:"Save"})]})})]})},P=n(13),L=n.n(P),T=n(20),A=function(e){var t=e.cards.reduce((function(e,t){return e+ +t.customFieldItems[0].value.number}),0);return Object(d.jsxs)("table",{className:"table table-hover table-striped",children:[Object(d.jsx)("thead",{children:Object(d.jsxs)("tr",{children:[Object(d.jsx)("th",{scope:"col",children:"#"}),Object(d.jsx)("th",{scope:"col",children:"Description"}),Object(d.jsx)("th",{scope:"col",align:"right",style:{textAlign:"right"},children:"Cost (USD)"}),Object(d.jsx)("th",{scope:"col",align:"right",style:{textAlign:"right"},children:"Cost (RUB)"})]})}),Object(d.jsx)("tbody",{children:e.cards.map((function(t,n){return Object(d.jsxs)("tr",{children:[Object(d.jsx)("th",{scope:"row",children:n+1}),Object(d.jsx)("td",{children:Object(d.jsx)("a",{className:"link-dark",target:"_blank",href:t.shortUrl,children:S(t)})}),Object(d.jsx)("td",{align:"right",children:t.customFieldItems[0].value.number}),Object(d.jsx)("td",{align:"right",children:e.altCurrencyRatio?"".concat((t.customFieldItems[0].value.number*e.altCurrencyRatio).toFixed(0)):"N/A"})]},t.id)}))}),Object(d.jsx)("tfoot",{children:Object(d.jsxs)("tr",{children:[Object(d.jsx)("th",{colSpan:2,scope:"row",children:"Total"}),Object(d.jsx)("td",{align:"right",children:Object(d.jsxs)("b",{children:["$",t]})}),Object(d.jsx)("td",{align:"right",children:Object(d.jsx)("b",{children:e.altCurrencyRatio?"".concat((t*e.altCurrencyRatio).toFixed(0),"\u20bd"):"N/A"})})]})})]})},K=function(){var e=b(j.localStorageKeys.trelloApiKey),t=Object(i.a)(e,1)[0],n=b(j.localStorageKeys.trelloApiToken),a=Object(i.a)(n,1)[0],r=b(j.localStorageKeys.payPalClientId),s=Object(i.a)(r,1)[0],l=b(j.localStorageKeys.payPalSecret),o=Object(i.a)(l,1)[0],u=Object(h.f)();t&&a||u.push(j.urls.settings);var m=Object(c.useState)(!1),x=Object(i.a)(m,2),N=x[0],S=x[1],I=Object(c.useState)(void 0),k=Object(i.a)(I,2),C=k[0],w=k[1],P=Object(c.useState)([]),K=Object(i.a)(P,2),R=K[0],F=K[1],E=Object(c.useState)([]),U=Object(i.a)(E,2),B=U[0],_=U[1];Object(c.useEffect)((function(){O((function(e){return w(e)}))}),[]),Object(c.useEffect)((function(){if(t&&a){var e=p(j.trelloLists.sentToClientListId,t,a,(function(e){return F(e.filter((function(e){return!e.labels||!e.labels.length})))})),n=p(j.trelloLists.sentToClientListId,t,a,(function(e){return _(e.filter((function(e){return e.labels&&e.labels.some((function(e){return e.id===j.labelsId.invoiced}))})))}));Promise.all([e,n]).then((function(){return S(!0)}))}}),[t,a]);var D=function(){var e=Object(T.a)(L.a.mark((function e(){var t,n,c,a,r,i;return L.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,v(s,o);case 2:return t=e.sent,e.next=5,g(t);case 5:return n=e.sent,e.next=8,y(t,n,R);case 8:c=e.sent,a=c.href.split("/"),r=a[a.length-1],i="https://www.paypal.com/invoice/details/".concat(r),window.open(i);case 13:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),M=function(){var e=Object(T.a)(L.a.mark((function e(){var n;return L.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:n=R.map((function(e){return f(e.id,j.labelsId.invoiced,t,a)})),Promise.all(n).then((function(){return u.push(j.urls.invoiced)}));case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();if(!N)return null;var H=s&&o?B.length?"Finish Previous Invoice":"Make Invoiced":"Provide PayPal settings",J=!s||!o||!!B.length;return Object(d.jsxs)("div",{className:"container",children:[Object(d.jsx)("div",{className:"row gy-3",children:Object(d.jsxs)("div",{className:"col",children:[Object(d.jsx)("h3",{children:"Unpaid Orders"}),Object(d.jsx)(A,{cards:R,altCurrencyRatio:C})]})}),Object(d.jsxs)("div",{className:"row gy-3 ",children:[Object(d.jsx)("div",{className:"col",children:Object(d.jsx)("button",{type:"button",className:"btn btn-outline-primary",disabled:!!B.length,onClick:D,children:H})}),Object(d.jsx)("div",{className:"col text-end",children:Object(d.jsx)("button",{type:"button",className:"btn btn-outline-primary",disabled:J,onClick:M,children:B.length?"Finish Previous Invoice":"Make Invoiced"})})]})]})},R=n(21),F=function(){var e=b(j.localStorageKeys.trelloApiKey),t=Object(i.a)(e,1)[0],n=b(j.localStorageKeys.trelloApiToken),a=Object(i.a)(n,1)[0],r=Object(h.f)();t&&a||r.push(j.urls.settings);var s=Object(c.useState)(!1),l=Object(i.a)(s,2),o=l[0],u=l[1],m=Object(c.useState)(void 0),v=Object(i.a)(m,2),g=v[0],y=v[1],N=Object(c.useState)([]),S=Object(i.a)(N,2),I=S[0],k=S[1];Object(c.useEffect)((function(){O((function(e){return y(e)}))}),[]),Object(c.useEffect)((function(){t&&a&&p(j.trelloLists.sentToClientListId,t,a,(function(e){return k(e.filter((function(e){return e.labels&&e.labels.some((function(e){return e.id===j.labelsId.invoiced}))})))})).then((function(){return u(!0)}))}),[t,a]);return o?Object(d.jsxs)("div",{className:"container",children:[Object(d.jsx)("div",{className:"row gy-3",children:Object(d.jsxs)("div",{className:"col",children:[Object(d.jsx)("h3",{children:"Invoiced Orders"}),Object(d.jsx)(A,{cards:I,altCurrencyRatio:g})]})}),Object(d.jsxs)("div",{className:"row gy-3 ",children:[Object(d.jsx)("div",{className:"col",children:Object(d.jsx)("button",{type:"button",className:"btn btn-outline-secondary",onClick:function(){var e=I.map((function(e){return x(e.id,j.labelsId.invoiced,t,a)}));Promise.all(e).then((function(){return r.push(j.urls.unpaid)}))},children:"Make Unpaid"})}),Object(d.jsx)("div",{className:"col text-end",children:Object(d.jsx)("button",{type:"button",className:"btn btn-outline-primary",onClick:function(){var e=I.map((function(e){return x(e.id,j.labelsId.invoiced,t,a)})),n=I.map((function(e){return f(e.id,j.labelsId.paid,t,a)}));Promise.all([].concat(Object(R.a)(n),Object(R.a)(e))).then((function(){return r.push(j.urls.paid)}))},children:"Make Paid"})})]})]}):null},E=function(){var e=b(j.localStorageKeys.trelloApiKey),t=Object(i.a)(e,1)[0],n=b(j.localStorageKeys.trelloApiToken),a=Object(i.a)(n,1)[0],r=Object(h.f)();t&&a||r.push(j.urls.settings);var s=Object(c.useState)(!1),l=Object(i.a)(s,2),o=l[0],u=l[1],m=Object(c.useState)(void 0),f=Object(i.a)(m,2),x=f[0],v=f[1],g=Object(c.useState)([]),y=Object(i.a)(g,2),N=y[0],S=y[1];return Object(c.useEffect)((function(){O((function(e){return v(e)}))}),[]),Object(c.useEffect)((function(){t&&a&&p(j.trelloLists.sentToClientListId,t,a,(function(e){return S(e.filter((function(e){return e.labels&&e.labels.some((function(e){return e.id===j.labelsId.paid}))})))})).then((function(){return u(!0)}))}),[t,a]),o?Object(d.jsx)("div",{className:"container",children:Object(d.jsx)("div",{className:"row gy-3",children:Object(d.jsxs)("div",{className:"col",children:[Object(d.jsx)("h3",{children:"Paid Orders"}),Object(d.jsx)(A,{cards:N,altCurrencyRatio:x})]})})}):null};var U=function(){return Object(d.jsxs)(m.a,{children:[Object(d.jsx)(C,{}),Object(d.jsxs)(h.c,{children:[Object(d.jsx)(h.a,{exact:!0,path:j.urls.settings,component:w}),Object(d.jsx)(h.a,{exact:!0,path:j.urls.unpaid,component:K}),Object(d.jsx)(h.a,{exact:!0,path:j.urls.invoiced,component:F}),Object(d.jsx)(h.a,{exact:!0,path:j.urls.paid,component:E}),Object(d.jsx)(h.a,{exact:!0,path:j.urls.home,component:k})]})]})},B=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,41)).then((function(t){var n=t.getCLS,c=t.getFID,a=t.getFCP,r=t.getLCP,s=t.getTTFB;n(e),c(e),a(e),r(e),s(e)}))};s.a.render(Object(d.jsx)(a.a.StrictMode,{children:Object(d.jsx)(U,{})}),document.getElementById("root")),B()}},[[40,1,2]]]);
//# sourceMappingURL=main.0329639a.chunk.js.map