(this["webpackJsonpwork-progress"]=this["webpackJsonpwork-progress"]||[]).push([[0],{24:function(e,t,c){},25:function(e,t,c){},34:function(e,t,c){"use strict";c.r(t);var s=c(0),l=c.n(s),n=c(17),a=c.n(n),r=(c(24),c(25),c(8)),o=c(18),i=c.n(o),j=c(1),b=function(e){return Object(j.jsx)("div",{className:"card",children:Object(j.jsxs)("div",{className:"card-body",children:[Object(j.jsx)("h6",{className:"card-subtitle mb-2",children:e.title}),Object(j.jsx)("h5",{className:"card-title text-success",children:e.isLoading?Object(j.jsx)(i.a,{prefix:"$",separator:",",end:e.value}):"Loading..."})]})})},d=function(e){var t=l.a.useState(localStorage.getItem(e)||""),c=Object(r.a)(t,2),s=c[0],n=c[1];return l.a.useEffect((function(){localStorage.setItem(e,s)}),[s]),[s,n]},u=c(7),m=c(2),h="5f4cdb937afb6a829d4ad8e9",O=function(){var e=d(u.localStorageKeys.trelloApiKey),t=Object(r.a)(e,1)[0],c=d(u.localStorageKeys.trelloApiToken),l=Object(r.a)(c,1)[0],n=Object(m.f)();t&&l||n.push(u.urls.settings);var a=Object(s.useState)(!1),o=Object(r.a)(a,2),i=o[0],O=o[1],x=Object(s.useState)([]),f=Object(r.a)(x,2),g=f[0],p=f[1];Object(s.useEffect)((function(){t&&l&&fetch("https://api.trello.com/1/lists/".concat(h,"/cards?key=").concat(t,"&token=").concat(l,"&customFieldItems=true")).then((function(e){return e.json()})).then((function(e){console.log(e),p(e),O(!0)}))}),[h,t,l]);var v=g.reduce((function(e,t){return e+ +t.customFieldItems[0].value.number}),0),y=g.filter((function(e){return!e.labels||!e.labels.length})).reduce((function(e,t){return e+ +t.customFieldItems[0].value.number}),0),N=g.filter((function(e){return e.labels&&e.labels.length})).reduce((function(e,t){return e+ +t.customFieldItems[0].value.number}),0),S=Math.max(100-y,0);return Object(j.jsx)("div",{className:"container",children:Object(j.jsxs)("div",{className:"row gy-3",children:[Object(j.jsx)("div",{className:"col-lg",children:Object(j.jsx)(b,{title:"Current Income",value:y,isLoading:i})}),Object(j.jsx)("div",{className:"col-lg",children:Object(j.jsx)(b,{title:"Left to Withdraw",value:S,isLoading:i})}),Object(j.jsx)("div",{className:"col-lg",children:Object(j.jsx)(b,{title:"Withdrawn Earnings",value:N,isLoading:i})}),Object(j.jsx)("div",{className:"col-lg",children:Object(j.jsx)(b,{title:"Total Income",value:v,isLoading:i})})]})})},x=c(9),f=function(){return Object(j.jsxs)("header",{className:"d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-body border-bottom shadow-sm",children:[Object(j.jsx)("p",{className:"h5 my-0 me-md-auto fw-normal",children:"Work Progress"}),Object(j.jsx)("nav",{className:"my-2 my-md-0 me-md-3",children:Object(j.jsx)(x.b,{className:"p-2 text-dark",to:"/",children:"Analytics"})}),Object(j.jsxs)(x.b,{className:"btn btn-outline-secondary",to:"/settings",children:[Object(j.jsx)("i",{className:"fa fa-cog"})," Settings"]})]})},g=function(){var e=d(u.localStorageKeys.trelloApiKey),t=Object(r.a)(e,2),c=t[0],s=t[1],l=d(u.localStorageKeys.trelloApiToken),n=Object(r.a)(l,2),a=n[0],o=n[1],i=Object(m.f)();return Object(j.jsxs)("div",{className:"container",children:[Object(j.jsx)("h1",{children:"Settings"}),Object(j.jsx)("div",{className:"row",style:{maxWidth:600},children:Object(j.jsxs)("form",{onSubmit:function(e){e.preventDefault(),i.push(u.urls.home)},children:[Object(j.jsxs)("div",{className:"mb-3",children:[Object(j.jsx)("label",{htmlFor:"trelloApiKey",className:"form-label",children:"Trello API Key"}),Object(j.jsx)("input",{type:"text",className:"form-control",id:"trelloApiKey","aria-describedby":"emailHelp",value:c,onChange:function(e){s(e.target.value)}})]}),Object(j.jsxs)("div",{className:"mb-3",children:[Object(j.jsx)("label",{htmlFor:"trelloApiToken",className:"form-label",children:"Trello API Token"}),Object(j.jsx)("input",{type:"text",className:"form-control",id:"trelloApiToken",value:a,onChange:function(e){o(e.target.value)}})]}),Object(j.jsx)("button",{type:"submit",className:"btn btn-primary",children:"Save"})]})})]})};var p=function(){return Object(j.jsxs)(x.a,{children:[Object(j.jsx)(f,{}),Object(j.jsxs)(m.c,{children:[Object(j.jsx)(m.a,{path:u.urls.settings,children:Object(j.jsx)(g,{})}),Object(j.jsx)(m.a,{path:u.urls.home,children:Object(j.jsx)(O,{})})]})]})},v=function(e){e&&e instanceof Function&&c.e(3).then(c.bind(null,35)).then((function(t){var c=t.getCLS,s=t.getFID,l=t.getFCP,n=t.getLCP,a=t.getTTFB;c(e),s(e),l(e),n(e),a(e)}))};a.a.render(Object(j.jsx)(l.a.StrictMode,{children:Object(j.jsx)(p,{})}),document.getElementById("root")),v()},7:function(e){e.exports=JSON.parse('{"urls":{"home":"/","settings":"/settings"},"localStorageKeys":{"trelloApiKey":"trelloApiKey","trelloApiToken":"trelloApiToken"}}')}},[[34,1,2]]]);
//# sourceMappingURL=main.fd382f32.chunk.js.map