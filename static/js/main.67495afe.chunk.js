(this["webpackJsonpnews-app"]=this["webpackJsonpnews-app"]||[]).push([[0],{103:function(e,a,t){e.exports=t(149)},129:function(e,a,t){},130:function(e,a,t){},132:function(e,a,t){},134:function(e,a,t){},135:function(e,a,t){},136:function(e,a,t){},138:function(e,a,t){},139:function(e,a,t){},140:function(e,a,t){},141:function(e,a,t){},142:function(e,a,t){},143:function(e,a,t){},144:function(e,a,t){},145:function(e,a,t){},146:function(e,a,t){},147:function(e,a,t){},148:function(e,a,t){},149:function(e,a,t){"use strict";t.r(a);var n=t(0),r=t.n(n),c=t(57),l=t(24),i=t(39),s=t(60),o=t(2),u={loading:!1,articles:null,saved:null,error:null,comments:null},m={isAuth:!1,userId:null,name:null,token:null,region:{label:"Europe",value:"EU"},language:{label:"English",value:"en"},loading:!1},d=t(94),p=t(95),f=Object(i.combineReducers)({profile:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:m,a=arguments.length>1?arguments[1]:void 0;switch(a.type){case"SET_REGION":return Object(o.a)(Object(o.a)({},e),{},{region:a.region});case"SET_LANGUAGE":return Object(o.a)(Object(o.a)({},e),{},{language:a.language});case"SET_NAME":return Object(o.a)(Object(o.a)({},e),{},{name:a.name});case"AUTH_SUCCESS":return Object(o.a)(Object(o.a)({},e),{},{isAuth:!0,userId:a.userId,token:a.token});case"AUTH_LOGOUT":return Object(o.a)(Object(o.a)({},e),m);case"SHOW_LOADER":return Object(o.a)(Object(o.a)({},e),{},{loading:!0});case"HIDE_LOADER":return Object(o.a)(Object(o.a)({},e),{},{loading:!1});default:return e}},articles:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:u,a=arguments.length>1?arguments[1]:void 0;switch(a.type){case"SET_ARTICLES":return Object(o.a)(Object(o.a)({},e),{},{articles:Object(s.a)(a.payload),error:null});case"SHOW_LOADER":return Object(o.a)(Object(o.a)({},e),{},{loading:!0});case"HIDE_LOADER":return Object(o.a)(Object(o.a)({},e),{},{loading:!1});case"SET_ERROR":return Object(o.a)(Object(o.a)({},e),{},{articles:null,error:a.payload});case"SET_COMMENTS":return Object(o.a)(Object(o.a)({},e),{},{comments:a.payload});case"SET_SAVED":return Object(o.a)(Object(o.a)({},e),{},{saved:a.payload});case"AUTH_LOGOUT":return Object(o.a)(Object(o.a)({},e),{},{saved:null});default:return e}}}),v=Object(i.createStore)(f,Object(d.composeWithDevTools)(Object(i.applyMiddleware)(p.a)));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var g=t(56),E=t.n(g),b=t(20),h=t(5),_=t(3),N=t.n(_),y=t(12),S=t(76),O=t.n(S),k=O.a.create({baseURL:"https://identitytoolkit.googleapis.com/v1/accounts"}),w=O.a.create({baseURL:"https://news-app-4c398.firebaseio.com/"}),j=O.a.create({baseURL:"https://api.currentsapi.services/v1/"}),x=function(e,a){return{type:"AUTH_SUCCESS",userId:e,token:a}},C=function(){return localStorage.removeItem("token"),localStorage.removeItem("userId"),localStorage.removeItem("expirationDate"),{type:"AUTH_LOGOUT"}},A=function(e){return function(a){setTimeout((function(){a(C())}),1e3*e)}},I=function(e){return{type:"SET_REGION",region:e}},T=function(e){return{type:"SET_NAME",name:e}},R=function(e){return{type:"SET_LANGUAGE",language:e}},L=function(){return function(){var e=Object(y.a)(N.a.mark((function e(a,t){var n,r,c;return N.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(a({type:"SHOW_LOADER"}),n=t().profile.userId){e.next=5;break}return a({type:"HIDE_LOADER"}),e.abrupt("return");case 5:return r=t().profile.token,e.prev=6,e.next=9,w.get("/users/".concat(n,".json?auth=").concat(r));case 9:(c=e.sent).data&&(c.data.name&&a(T(c.data.name)),c.data.region&&a(I(c.data.region)),c.data.language&&a(R(c.data.language))),e.next=16;break;case 13:e.prev=13,e.t0=e.catch(6),console.log(e.t0);case 16:a({type:"HIDE_LOADER"});case 17:case"end":return e.stop()}}),e,null,[[6,13]])})));return function(a,t){return e.apply(this,arguments)}}()},D=(t(129),function(e){var a,t=e.theme,n=e.onChange;return a="light"!==t,r.a.createElement("div",{className:"toggle-wrapper"},r.a.createElement("input",{type:"checkbox",checked:a,id:"theme-toggle",onChange:n}),r.a.createElement("label",{htmlFor:"theme-toggle",className:"toggle"},r.a.createElement("span",{className:"toggle__ray"},r.a.createElement("span",{className:"ray ray--1"}),r.a.createElement("span",{className:"ray ray--2"}),r.a.createElement("span",{className:"ray ray--3"})),r.a.createElement("span",{className:"toggle__items"},r.a.createElement("span",{className:"glare"}),r.a.createElement("span",{className:"dot dot--1"}),r.a.createElement("span",{className:"dot dot--2"}),r.a.createElement("span",{className:"dot dot--3"}))))}),U=(t(130),Object(h.g)((function(e){var a=e.isAuthenticated,t=e.children,n=[{to:"/profile",tooltip:"Profile",icon:"fas fa-user-circle",flow:"right"},{to:"/",exact:!0,tooltip:"Feed",icon:"fas fa-stream",flow:"right"}];return a&&n.push({to:"/saved",tooltip:"Saved",icon:"fas fa-bookmark",flow:"right"}),r.a.createElement("nav",{className:"Sidebar"},r.a.createElement("ul",{className:"Sidebar__wrapper"},n.map((function(e){return r.a.createElement("li",{className:"Sidebar__item",key:e.tooltip},r.a.createElement(c.b,Object.assign({},e,{"data-testid":"".concat(e.tooltip,"-link")}),r.a.createElement("i",{className:"".concat(e.icon)})))}))),t)}))),F={hidden:{opacity:0},visible:{opacity:1,transition:{type:"tween"}},exit:{opacity:0}},H={hidden:{opacity:0,x:"-100%"},visible:{opacity:1,x:0,transition:{type:"tween",staggerChildren:.03}}},W={hidden:{x:"+100%"},visible:{x:0,transition:{type:"tween"}},exit:{x:"+100%",transition:{type:"tween"}}},M=t(26),P=(t(132),function(e){var a=e.label,t=e.type,n=e.value,c=e.onChange,l=e.onBlur,i=Math.random().toString(36).substr(2,9);return r.a.createElement("div",{className:"Input"},r.a.createElement("label",{className:"Input__label",htmlFor:"input".concat(i)},a,":"),r.a.createElement("input",{id:"input".concat(i),className:"Input__field",onChange:c,type:t,value:n,onBlur:l}))}),B=t(55),V=t(98),X=t.n(V),Y=function(e){var a=e.btnType,t=e.onClick,n=e.disabled,c=e.value,l=e.type;return r.a.createElement("button",{type:l,className:X.a[a],onClick:t,disabled:n},c)},q=t(99),G=t.n(q),J=function(){return r.a.createElement("div",{className:G.a.lds_ellipsis,"data-testid":"loader"},r.a.createElement("div",null),r.a.createElement("div",null),r.a.createElement("div",null),r.a.createElement("div",null))},z=t(61),K=(t(134),{email:"",password:""}),Z=function(){var e=Object(y.a)(N.a.mark((function e(a,t){return N.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t.setSubmitting(!1);case 1:case"end":return e.stop()}}),e)})));return function(a,t){return e.apply(this,arguments)}}(),Q=z.a().shape({email:z.b().email().required("The field is required"),password:z.b().min(6,"The password should contain at least 6 symbols").required("The field is required"),generall:z.b()}),$=function(e){return r.a.createElement("span",{className:"Form__error"},r.a.createElement("i",{className:"fas fa-exclamation-circle"}),e)},ee=function(e,a){return r.a.createElement(B.b,{className:"Form__field",type:e,name:a||e,id:a||e,placeholder:a?a.replace(/^\w/,(function(e){return e.toUpperCase()})):e.replace(/^\w/,(function(e){return e.toUpperCase()}))})},ae=function(e){var a=e.handleRegister,t=e.isLoading,n=e.handleLogin;return r.a.createElement(B.d,{initialValues:K,onSubmit:Z,validationSchema:Q},(function(e){return r.a.createElement(B.c,{name:"auth",className:"Form"},r.a.createElement("div",{className:"Form__wrapper"},ee("email"),r.a.createElement(B.a,{name:"email",render:$})),r.a.createElement("div",{className:"Form__wrapper"},ee("password"),r.a.createElement(B.a,{name:"password",render:$})),r.a.createElement("div",{className:"Form__wrapper-buttons"},r.a.createElement(Y,{type:"button",btnType:"primary",disabled:!(e.isValid&&e.dirty),onClick:function(){return n(e.values,e.setStatus,!0)},value:"Login"}),r.a.createElement(Y,{type:"button",btnType:"secondary",onClick:function(){return a(e.values,e.setStatus,!1)},disabled:!(e.isValid&&e.dirty),value:"Register"})),t?r.a.createElement("div",{className:"Form__loader"},r.a.createElement(J,null)):e.status&&r.a.createElement("span",{className:"Form__error-form"},e.status.generall))}))},te=(t(135),function(e){var a=e.label,t=e.name,n=e.items,c=e.onChange,l=e.defValue;return r.a.createElement("div",{className:"Select"},r.a.createElement("label",{className:"Select__label",htmlFor:t},a,":"),r.a.createElement("select",{className:"Select__options",name:t,id:t,onChange:c,defaultValue:l.value},n.map((function(e){return r.a.createElement("option",{value:e.value,key:e.value,"data-testid":"select-option"},e.label)}))))}),ne=(t(136),[{label:"USA",value:"US"},{label:"Russia",value:"RU"},{label:"Europe",value:"EU"}]),re=[{label:"English",value:"en"},{label:"\u0420\u0443\u0441\u0441\u043a\u0438\u0439",value:"ru"},{label:"German",value:"de"}],ce={auth:function(e,a,t){return function(){var n=Object(y.a)(N.a.mark((function n(r){var c,l,i,s,o,u,m,d,p;return N.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return r({type:"SHOW_LOADER"}),c={email:e.email,password:e.password,returnSecureToken:!0},l=t?":signInWithPassword?key=".concat("AIzaSyDVaiOAUhd167Pqu8ZWlaTlrNXfhp0vYN8"):":signUp?key=".concat("AIzaSyDVaiOAUhd167Pqu8ZWlaTlrNXfhp0vYN8"),n.prev=3,n.next=6,k.post(l,c);case 6:i=n.sent,s=i.data,o=s.expiresIn,u=s.idToken,m=s.localId,d=new Date((new Date).getTime()+1e3*+o),localStorage.setItem("token",u),localStorage.setItem("userId",m),localStorage.setItem("expirationDate",d.toString()),r(x(m,u)),n.next=26;break;case 15:n.prev=15,n.t0=n.catch(3),n.t1=n.t0.response.data.error.message,n.next="EMAIL_EXISTS"===n.t1?20:"EMAIL_NOT_FOUND"===n.t1?22:24;break;case 20:return p="This email is already registered",n.abrupt("break",25);case 22:return p="This email haven't been registered yet",n.abrupt("break",25);case 24:p="Email or password is incorrect";case 25:a({generall:p});case 26:r({type:"HIDE_LOADER"});case 27:case"end":return n.stop()}}),n,null,[[3,15]])})));return function(e){return n.apply(this,arguments)}}()},sendRegion:function(e){return function(){var a=Object(y.a)(N.a.mark((function a(t,n){var r,c;return N.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return t(I(e)),r=n().profile.userId,c=n().profile.token,a.prev=3,a.next=6,w.patch("/users/".concat(r,".json?auth=").concat(c),{region:e});case 6:a.next=11;break;case 8:a.prev=8,a.t0=a.catch(3),console.log(a.t0);case 11:case"end":return a.stop()}}),a,null,[[3,8]])})));return function(e,t){return a.apply(this,arguments)}}()},logout:C,sendName:function(){return function(){var e=Object(y.a)(N.a.mark((function e(a,t){var n,r,c;return N.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t().profile.userId,r=t().profile.name,c=t().profile.token,e.prev=3,e.next=6,w.patch("/users/".concat(n,".json?auth=").concat(c),{name:r});case 6:e.next=11;break;case 8:e.prev=8,e.t0=e.catch(3),console.log(e.t0);case 11:case"end":return e.stop()}}),e,null,[[3,8]])})));return function(a,t){return e.apply(this,arguments)}}()},setName:T,getUserData:L,sendLanguage:function(e){return function(){var a=Object(y.a)(N.a.mark((function a(t,n){var r,c;return N.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return t(R(e)),r=n().profile.userId,c=n().profile.token,a.prev=3,a.next=6,w.patch("/users/".concat(r,".json?auth=").concat(c),{language:e});case 6:a.next=11;break;case 8:a.prev=8,a.t0=a.catch(3),console.log(a.t0);case 11:case"end":return a.stop()}}),a,null,[[3,8]])})));return function(e,t){return a.apply(this,arguments)}}()}},le=Object(l.b)((function(e){return{isAuthentiphicated:e.profile.isAuth,loading:e.profile.loading,user:{name:e.profile.name,language:e.profile.language,region:e.profile.region}}}),ce)((function(e){var a,t=e.isAuthentiphicated,c=e.auth,l=e.loading,i=e.logout,s=e.sendRegion,o=e.sendLanguage,u=e.sendName,m=e.user,d=e.setName,p=e.getUserData;Object(n.useEffect)((function(){p()}),[p,t]);return r.a.createElement(M.b.div,{variants:F,initial:"hidden",animate:"visible",exit:"exit",className:"Profile"},t?r.a.createElement("div",{className:"Profile__settings"},r.a.createElement("h1",{className:"Profile__title"},"Settings"),l?r.a.createElement(J,null):r.a.createElement("div",{className:"Profile__inputs"},r.a.createElement(te,{label:"Select your region",defValue:ne.find((function(e){return m.region.value===e.value})),name:"countries",items:ne,onChange:function(e){var a=ne.find((function(a){return a.value===e.target.value}));s(a)}}),r.a.createElement(te,{label:"Select news language",defValue:re.find((function(e){return m.language.value===e.value})),name:"languages",items:re,onChange:function(e){var a=re.find((function(a){return a.value===e.target.value}));o(a)}}),r.a.createElement(P,{type:"text",label:"Name",onChange:function(e){return d(e.target.value)},value:null!==(a=m.name)&&void 0!==a?a:"",onBlur:u}),r.a.createElement(Y,{btnType:"primary",onClick:i,value:"Logout"}))):r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"Profile__intro"},r.a.createElement("h1",{className:"Profile__title"},"Newsium"),r.a.createElement("span",null,"News from all over the world in one place")),r.a.createElement("div",{className:"Profile__form"},r.a.createElement("h2",{className:"Profile__subtitle"},"Log in to get the full access"),r.a.createElement(ae,{handleRegister:c,isLoading:l,handleLogin:c}),r.a.createElement("div",{className:"Profile__info"},r.a.createElement("span",null,"Creating an account will give you the ability to:"),r.a.createElement("ul",null,r.a.createElement("li",null,"Save articles to read them later"),r.a.createElement("li",null,"Select the region and news language"))))))})),ie=t(82),se=t.n(ie),oe=function(e){var a=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];return function(){var t=Object(y.a)(N.a.mark((function t(n,r){var c,l,i,u,m,d;return N.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return c=r().profile.userId,l=r().articles.articles,i=r().articles.saved,u=r().profile.token,m=[e],i&&(d=i.find((function(a){return a.id===e.id})),m=d?i.filter((function(a){return a.id!==e.id})):[e].concat(Object(s.a)(i))),n(ue(m)),a&&l&&n(pe(l.map((function(a){return a.id===e.id?Object(o.a)(Object(o.a)({},a),{},{isSaved:!a.isSaved}):a})))),t.prev=8,t.next=11,w.patch("/users/".concat(c,".json?auth=").concat(u),{articles:m});case 11:t.next=16;break;case 13:t.prev=13,t.t0=t.catch(8),console.log(t.t0);case 16:case"end":return t.stop()}}),t,null,[[8,13]])})));return function(e,a){return t.apply(this,arguments)}}()},ue=function(e){return{type:"SET_SAVED",payload:e}},me=function(){return function(){var e=Object(y.a)(N.a.mark((function e(a,t){var n,r,c;return N.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t().profile.userId,r=t().profile.token,e.prev=2,e.next=5,w.get("/users/".concat(n,"/articles.json?auth=").concat(r));case 5:(c=e.sent).data&&a(ue(c.data)),e.next=12;break;case 9:e.prev=9,e.t0=e.catch(2),console.log(e.t0);case 12:case"end":return e.stop()}}),e,null,[[2,9]])})));return function(a,t){return e.apply(this,arguments)}}()},de=function(e){return function(){var a=Object(y.a)(N.a.mark((function a(t){var n,r;return N.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return t({type:"SHOW_LOADER"}),a.prev=1,a.next=4,w.get("/comments/".concat(e,".json"));case 4:(n=a.sent).data?(r=Object.entries(n.data).reduce((function(e,a){var t={id:a[0],message:a[1].message,date:a[1].date,author:a[1].author};return[].concat(Object(s.a)(e),[t])}),[]),t(fe(r))):t(fe(null)),a.next=11;break;case 8:a.prev=8,a.t0=a.catch(1),console.log(a.t0);case 11:t({type:"HIDE_LOADER"});case 12:case"end":return a.stop()}}),a,null,[[1,8]])})));return function(e){return a.apply(this,arguments)}}()},pe=function(e){return{type:"SET_ARTICLES",payload:e}},fe=function(e){return{type:"SET_COMMENTS",payload:e}},ve=function(e){return{type:"SET_ERROR",payload:e}},ge=function(e){var a=new RegExp(/(.*kubrick.*)|(.*wthr.*)|(.*nydailynews.*)|(.*statesman.*)|(.*arabnews.*)|(.*washingtonpost.*)/);return e&&!a.test(e)?e:"./placeholder.jpg"},Ee=function(e){var a=new RegExp(/.*arxiv.*/);return e&&!a.test(e)?e.toUpperCase():""},be=function(e){return e||""},he=(t(92),t(138),{hidden:{x:"-100%"},visible:{x:0},exit:{x:"-100%"}}),_e=function(e){var a=new RegExp(/(.*kubrick.*)|(.*wthr.*)|(.*nydailynews.*)|(.*statesman.*)|(.*arabnews.*)|(.*washingtonpost.*)/);return e&&!a.test(e)?e:"./placeholder.jpg"},Ne=function(e){var a=e.image,t=e.title,n=e.id,c=e.onClick,l=e.onDelete;return r.a.createElement(M.b.div,{variants:he,initial:"hidden",exit:"exit",whileHover:{y:-2},className:"SmallCard"},r.a.createElement("button",{className:"SmallCard__btn",onClick:function(){return l(n)}},r.a.createElement("i",{className:"fas fa-times"})),r.a.createElement("div",{className:"SmallCard__info",onClick:function(){return c(n)}},r.a.createElement("img",{src:_e(a),alt:"Article",className:"SmallCard__image"}),r.a.createElement("span",{className:"SmallCard__title"},t)))},ye=(t(139),function(e){var a=e.comment;return r.a.createElement("div",{className:"Comment"},r.a.createElement("i",{className:"fas fa-user-circle"}),r.a.createElement("div",{className:"Comment__area"},r.a.createElement("div",{className:"Comment__info"},r.a.createElement("span",{className:"Comment__author"},a.author),r.a.createElement("span",{className:"Comment__date"},a.date)),r.a.createElement("span",{className:"Comment__message"},a.message)))}),Se=(t(140),function(e){var a=e.comments,t=e.saveComment,c=e.loading,l=Object(n.useState)(""),i=Object(b.a)(l,2),s=i[0],o=i[1];return r.a.createElement("div",{className:"Comments"},c?r.a.createElement("div",{className:"Comments__loader"},r.a.createElement(J,null)):a&&a.map((function(e){return r.a.createElement(ye,{comment:e,key:e.id})})),r.a.createElement("div",{className:"Comments__field"},r.a.createElement("textarea",{className:"Comments__input",placeholder:"Add a comment...",onChange:function(e){o(e.target.value)},value:s}),r.a.createElement(Y,{type:"button",btnType:"primary",onClick:function(){s&&t(s),o("")},value:"Submit"})))}),Oe=(t(141),t(152)),ke=t(153),we=t(154),je=t(155),xe=(t(142),function(e){var a=e.url;return r.a.createElement("div",{className:"Social","data-testid":"Social"},r.a.createElement(Oe.a,{url:a,children:r.a.createElement("i",{className:"fab fa-facebook"})}),r.a.createElement(ke.a,{url:a,children:r.a.createElement("i",{className:"fab fa-reddit"})}),r.a.createElement(we.a,{url:a,children:r.a.createElement("i",{className:"fab fa-twitter"})}),r.a.createElement(je.a,{url:a,children:r.a.createElement("i",{className:"fab fa-telegram"})}))}),Ce={requestSaved:me,toggleArticle:oe,saveComment:function(e,a){return function(){var t=Object(y.a)(N.a.mark((function t(n,r){var c,l;return N.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n({type:"SHOW_LOADER"}),l={author:null!==(c=r().profile.name)&&void 0!==c?c:"Anonymous",message:e,date:se()().format("MMM Do YY")},t.prev=2,t.next=5,w.post("/comments/".concat(a,".json"),Object(o.a)({},l));case 5:n(de(a)),t.next=11;break;case 8:t.prev=8,t.t0=t.catch(2),console.log(t.t0);case 11:n({type:"HIDE_LOADER"});case 12:case"end":return t.stop()}}),t,null,[[2,8]])})));return function(e,a){return t.apply(this,arguments)}}()},getComments:de},Ae=Object(l.b)((function(e){return{loading:e.articles.loading,articles:e.articles.saved,error:e.articles.error,comments:e.articles.comments}}),Ce)((function(e){var a=e.loading,t=e.requestSaved,c=e.articles,l=e.toggleArticle,i=e.comments,s=e.saveComment,o=e.getComments;Object(n.useEffect)((function(){t()}),[t]);var u=Object(n.useState)(null),m=Object(b.a)(u,2),d=m[0],p=m[1],f=Object(n.useState)(!1),v=Object(b.a)(f,2),g=v[0],E=v[1],h=function(e){var a=c.find((function(a){return a.id===e}));p(a),o(a.id),E(!0)},_=function(e){var a=c.find((function(a){return a.id===e}));l(a,!1)};return r.a.createElement(M.b.div,{className:"Saved",variants:H,initial:"hidden",animate:"visible"},c&&c.length>0?r.a.createElement("div",{className:"Saved__cards"},c.map((function(e){return r.a.createElement(Ne,Object.assign({},e,{key:e.id,onDelete:_,onClick:h}))}))):r.a.createElement("span",{className:"Saved__message"},"You haven't saved anything yet"),r.a.createElement(M.a,null,d&&c&&c.length>0&&g&&r.a.createElement(M.b.div,{variants:W,initial:"hidden",animate:"visible",exit:"exit",className:"Saved__reader active",key:"reader"},r.a.createElement("div",{className:"Saved__image",style:{backgroundImage:"linear-gradient(0deg, rgba(0,0,0,0.7047820104604341) 0%, rgba(255,255,255,0) 49%,rgba(0,0,0,0.755202178527661) 100%),"+"url(".concat(d.image,")")}},r.a.createElement("h1",{className:"Saved__title"},d.title),r.a.createElement(xe,{url:d.url})),r.a.createElement("div",{className:"Saved__info"},r.a.createElement("button",{className:"Saved__closeBtn",onClick:function(){return E(!1)}},r.a.createElement("i",{className:"fas fa-arrow-left"}))," ",r.a.createElement("h2",{className:"Saved__description"},d.description),r.a.createElement("span",{className:"Saved__source"},d.author),r.a.createElement("a",{href:d.url,target:"blank"},r.a.createElement("i",{className:"fas fa-external-link-alt",title:"Read the article"})),r.a.createElement("div",{className:"Saved__comments"},r.a.createElement("i",{className:"fas fa-comment"}),r.a.createElement("span",null,"Comments")),r.a.createElement(Se,{comments:i,saveComment:function(e){return s(e,d.id)},loading:a})))))}));t(143);function Ie(){return r.a.createElement("div",{className:"timeline-wrapper","data-testid":"post-placeholder"},r.a.createElement("div",{className:"timeline-item"},r.a.createElement("div",{className:"animated-background"},r.a.createElement("div",{className:"background-masker content-image"}),r.a.createElement("div",{className:"background-masker content-title"}),r.a.createElement("div",{className:"background-masker content-title-2"}),r.a.createElement("div",{className:"background-masker content-title-short"}),r.a.createElement("div",{className:"background-masker content-subtitle"}))))}t(144);var Te=function(e){var a=e.handleSubmit,t=Object(n.useState)(""),c=Object(b.a)(t,2),l=c[0],i=c[1];return r.a.createElement("form",{className:"Search",name:"search",onSubmit:function(e){e.preventDefault(),l.trim()&&a(l)}},r.a.createElement("input",{type:"text",placeholder:"Search",onChange:function(e){i(e.target.value)},value:l}),r.a.createElement("button",{type:"submit"},r.a.createElement("i",{className:"fas fa-search"})))},Re=t(102),Le=(t(145),Object(n.memo)((function(e){var a=e.url,t=e.image,n=e.author,c=e.title,l=e.id,i=e.isSaved,s=e.published,o=e.description,u=e.showButtons,m=e.onSave;return r.a.createElement("div",{className:"Card__wrapper"},r.a.createElement("a",{href:a,className:"Card",target:"_blank",rel:"noopener noreferrer","data-tooltip":o},r.a.createElement(Re.LazyLoadImage,{src:t,alt:"Article",className:"Card__image",effect:"blur"}),r.a.createElement("span",{className:"Card__title"},c.replace(/-\s.*/,""))),r.a.createElement("div",{className:"Card__info"},r.a.createElement("div",{className:"Card__source"},n),u&&r.a.createElement("div",{className:"Card__buttons"},r.a.createElement("input",{checked:i,id:l,type:"checkbox",onChange:function(){return m({id:l,url:a,image:t,title:c,author:n,description:o,published:s,isSaved:i})}}),r.a.createElement("label",{htmlFor:l,className:"Card__btn",title:"Save"},r.a.createElement("i",{className:"fas fa-bookmark"})))))}))),De=Object(n.memo)((function(e){var a=e.items,t=e.showButtons,n=e.onSave;return r.a.createElement("div",{className:"row"},function(e){var a;return"string"===typeof(null===e||void 0===e||null===(a=e[0])||void 0===a?void 0:a.title)}(a)?a.map((function(e){return r.a.createElement("div",{key:e.id,className:"col-12 col-md-6 col-lg-4 col-xl-3"},r.a.createElement(Le,Object.assign({},e,{showButtons:t,onSave:n})))})):a.map((function(){return r.a.createElement("div",{key:Math.random(),className:"col-12 col-md-6 col-lg-4 col-xl-3"},r.a.createElement(Ie,null))})))})),Ue=(t(146),["all","business","entertainment","health","science","sports"]),Fe={requestArticles:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"all",a=arguments.length>1?arguments[1]:void 0;return function(){var t=Object(y.a)(N.a.mark((function t(n,r){var c,l,i,s,u,m,d,p;return N.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return c=r().profile.language.value,l=r().profile.region.value,i="all"!==e?"latest-news?country=".concat(l,"&language=").concat(c,"&category=").concat(e,"&apiKey=").concat("c9SCRSA_4i0oyXRWXT-SNTX4NYJm-JlB_-YRLO5gt8Wkdan3"):a?"search?country=".concat(l,"&language=").concat(c,"&start_date=").concat(se()().subtract(1,"days").format(),"&apiKey=").concat("c9SCRSA_4i0oyXRWXT-SNTX4NYJm-JlB_-YRLO5gt8Wkdan3"):"latest-news?country=".concat(l,"&language=").concat(c,"&apiKey=").concat("c9SCRSA_4i0oyXRWXT-SNTX4NYJm-JlB_-YRLO5gt8Wkdan3"),n({type:"SHOW_LOADER"}),t.prev=4,t.next=7,j.get(i);case 7:if(0!==(s=t.sent).data.news.length){t.next=12;break}n(ve("Nothing has been found. Please change the region or the language.")),t.next=25;break;case 12:if(!a){t.next=18;break}u=new RegExp("".concat(a),"g"),(m=s.data.news.filter((function(e){return u.test(e.description)||u.test(e.title)}))).length>0?n(pe(m)):n(ve("Nothing has been found.")),t.next=25;break;case 18:if(d=s.data.news.map((function(e){return Object(o.a)(Object(o.a)({},e),{},{description:be(e.description),author:Ee(e.author),image:"None"===e.image?"./placeholder.jpg":ge(e.image),isSaved:!1})})),!r().profile.userId){t.next=24;break}return t.next=22,n(me());case 22:(p=r().articles.saved)&&(d=d.map((function(e){return Object(o.a)(Object(o.a)({},e),{},{isSaved:!!p.find((function(a){return a.id===e.id}))})})));case 24:n(pe(d));case 25:t.next=30;break;case 27:t.prev=27,t.t0=t.catch(4),n(ve("Server error. Please, try again later."));case 30:n({type:"HIDE_LOADER"});case 31:case"end":return t.stop()}}),t,null,[[4,27]])})));return function(e,a){return t.apply(this,arguments)}}()},toggleArticle:oe},He=Object(l.b)((function(e){return{loading:e.articles.loading,articles:e.articles.articles,error:e.articles.error,isAuthenticated:e.profile.isAuth,savedArticles:e.articles.saved}}),Fe)((function(e){var a=e.articles,t=e.loading,c=e.requestArticles,l=e.error,i=e.isAuthenticated,s=e.toggleArticle;Object(n.useEffect)((function(){c()}),[c]);var o=Object(n.useState)("all"),u=Object(b.a)(o,2),m=u[0],d=u[1],p=Object(n.useState)(!1),f=Object(b.a)(p,2),v=f[0],g=f[1],E=Array(8).fill(r.a.createElement(Ie,null));return r.a.createElement(M.b.main,{variants:F,initial:"hidden",animate:"visible",exit:"exit",className:"Feed"},r.a.createElement("div",{className:"Feed__header"},r.a.createElement("h1",{className:"Feed__main-title"},"Latest news"),r.a.createElement("div",{className:v?"Feed__btn active":"Feed__btn",onClick:function(){g((function(e){return!e}))},"data-testid":"burger"},r.a.createElement("span",{className:"burger"}," ")),r.a.createElement("div",{className:v?"Feed__nav active":"Feed__nav"},r.a.createElement("ul",{className:"Feed__categories_wrapper"},Ue.map((function(e,a){return r.a.createElement("li",{className:e===m?"Feed__category active":"Feed__category",key:a},r.a.createElement("button",{onClick:function(){return function(e){c(e),d(e)}(e)}},e.replace(/^\w/,(function(e){return e.toUpperCase()}))))}))),r.a.createElement(Te,{handleSubmit:function(e){var a=encodeURIComponent(e.toString());c("all",a),d("all")}}))),r.a.createElement("div",{className:"Feed__wrapper container-fluid"},r.a.createElement("div",{className:"Feed__content"},t?r.a.createElement(De,{items:E}):a?r.a.createElement(De,{showButtons:i,items:a,onSave:s}):l&&r.a.createElement("span",{"data-testid":"error",className:"Feed__error"},l)),r.a.createElement("div",{className:"Feed__footer"},r.a.createElement("span",null,"Powered by"," ",r.a.createElement("a",{href:"https://currentsapi.services/en",target:"_blank",rel:"noopener noreferrer"},"currentsapi")))))})),We=(t(147),{autoLogin:function(){return function(e){var a=localStorage.getItem("token"),t=localStorage.getItem("userId"),n=localStorage.getItem("expirationDate");if(a&&t&&n){var r=new Date(n);r<=new Date?e(C()):(e(x(t,a)),e(L()),e(A((r.getTime()-(new Date).getTime())/1e3)))}else e(C())}}}),Me=Object(l.b)((function(e){return{isAuthenticated:e.profile.isAuth}}),We)((function(e){var a=e.isAuthenticated,t=e.autoLogin,c=Object(n.useState)("light"),l=Object(b.a)(c,2),i=l[0],s=l[1];Object(n.useEffect)((function(){var e=localStorage.getItem("NEWSIUM/theme");e&&s(e)}),[]),Object(n.useEffect)((function(){localStorage.setItem("NEWSIUM/theme",i)}),[i]),Object(n.useEffect)((function(){t()}),[t]);var o=[r.a.createElement(h.b,{path:"/profile",component:le,key:"profile"}),r.a.createElement(h.b,{path:"/",exact:!0,component:He,key:"feed"})];return a&&o.push(r.a.createElement(h.b,{path:"/saved",component:Ae,key:"saved"})),r.a.createElement("div",{className:"App ".concat(i)},r.a.createElement(U,{isAuthenticated:a},r.a.createElement(D,{theme:i,onChange:function(){s("light"===i?"dark":"light")}})),r.a.createElement(h.d,null,o,r.a.createElement(h.a,{to:"/"})))}));t(148);E.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(c.a,null,r.a.createElement(l.a,{store:v},r.a.createElement(Me,null)))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},98:function(e,a,t){e.exports={primary:"Button_primary__1g_w5",secondary:"Button_secondary__1ZtVI"}},99:function(e,a,t){e.exports={lds_ellipsis:"Loader_lds_ellipsis__39DjF","lds-ellipsis1":"Loader_lds-ellipsis1__2nQUq","lds-ellipsis2":"Loader_lds-ellipsis2__5mHdb","lds-ellipsis3":"Loader_lds-ellipsis3__3HpYi"}}},[[103,1,2]]]);
//# sourceMappingURL=main.67495afe.chunk.js.map