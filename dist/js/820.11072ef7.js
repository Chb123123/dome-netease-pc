"use strict";(self["webpackChunkdemo_netease_pc"]=self["webpackChunkdemo_netease_pc"]||[]).push([[820],{6820:function(e,l,a){a.r(l),a.d(l,{default:function(){return D}});a(7658),a(541);var t=a(3396),s=a(4870),i=a(7139),u=a(3436),n=a(7178),o=a(2483);const c=e=>((0,t.dD)("data-v-2c78cb8e"),e=e(),(0,t.Cn)(),e),r=c((()=>(0,t._)("div",null,null,-1))),v={class:"mainView"},m={style:{"margin-top":"20px"}},d={class:"container-main"},g={class:"mainView"},p={class:"musicCount"},f={class:"musicList"},_=["onClick"],y={class:"indexStyle"},w={class:"musicName"},S={class:"musicAuthor"},k={class:"songIntroduction"},U={class:"musicAbout"},h=["src"],z={style:{"margin-top":"20px"}},I={key:0,class:"playMusicMoudle"},C={class:"leftAbout"},b=["src"],L={class:"musicAuthorAbout"},W={style:{"margin-bottom":"20px"}},x={key:0},H={class:"playMoudel"},A={class:"PlayIcons"},N=c((()=>(0,t._)("div",{class:"progressBar"}," 播放进度条 ",-1))),J={key:1,class:"playMusicMoudle notMusicABout",style:{"font-size":"24px",color:"white"}};var M={__name:"playListAbout",setup(e){let l=(0,s.iH)([]);const a=(0,o.tv)();let c=(0,s.iH)(!0),M=(0,s.iH)({}),O=(0,s.iH)({}),j=(0,s.iH)(!0),D=(0,s.iH)(""),V=(0,s.iH)(),B=(0,s.iH)(!0),E=(0,s.iH)(!1),P=(0,s.iH)(!1),R=(0,s.iH)();function Z(){c.value=!0,(0,u.Z)({url:"/playlist/track/all",params:{id:M.creativeId}}).then((e=>{200===e.data.code?l.value=e.data.songs:F(),c.value=!1}))}function q(){a.back()}function F(e){(0,n.z8)(e||"获取数据失败，请稍后重试！")}function K(e,l){if(R.value=l,V.value=e,E.value=!1,j){if(j.value=!1,O.value=e.al,sessionStorage.getItem("collectList")){let l=JSON.parse(sessionStorage.getItem("collectList"));for(let a=0;a<l.length;a++)l[a].id===e.al.id&&(E.value=!0)}(0,u.Z)({url:"/song/url",params:{id:e.al.id}}).then((e=>{200===e.data.code?e.data.data[0].url?(D.value=e.data.data[0].url,P.value=!0):(P.value=!1,F("当前歌曲暂未有有效URL,请切换其他歌曲")):F(),j.value=!0}))}else F("点击过快，请稍后重试!")}function T(){P.value?(console.log("点击播放音乐"),B.value=!1):(0,n.z8)({type:"info",message:"当前音乐的播放地址不存在"})}function Y(){console.log("暂停音乐"),B.value=!0}function G(){if(R.value||0==R.value)return 0===R.value?(V.value=l.value[l.value.length-1],R.value=l.value.length-1,O.value=V.value.al,void K(V.value,R.value)):(R.value-=1,V.value=l.value[R.value],O.value=V.value.al,void K(V.value,R.value));(0,n.z8)({type:"info",message:"请选择歌曲！"})}function Q(){if(R.value||0==R.value)return R.value===l.value.length?(V.value=l.value[0],O.value=V.value.al,void K(V.value,R.value)):(R.value+=1,V.value=l.value[R.value],O.value=V.value.al,void K(V.value,R.value));(0,n.z8)({type:"info",message:"请选择歌曲！"})}function X(){if(V.value){if(sessionStorage.getItem("collectList")){let e=JSON.parse(sessionStorage.getItem("collectList"));e.push(V._value.al),console.log(e),sessionStorage.removeItem("collectList"),sessionStorage.setItem("collectList",JSON.stringify(e))}else{let e=[];e.unshift(V._value.al),sessionStorage.setItem("collectList",JSON.stringify(e))}E.value=!0,(0,n.z8)({type:"success",message:"收藏成功"})}else(0,n.z8)({type:"error",message:"请选择音乐!"})}function $(){E.value=!1;let e=JSON.parse(sessionStorage.getItem("collectList"));e.some(((l,a)=>{if(l.id===V._value.al.id)return e.splice(a,1),!0})),sessionStorage.removeItem("collectList"),sessionStorage.setItem("collectList",JSON.stringify(e)),(0,n.z8)({type:"info",message:"取消收藏"})}return M=JSON.parse(localStorage.getItem("playListAbout")),Z(),console.log(V.value),(e,a)=>{const u=(0,t.up)("el-skeleton"),n=(0,t.up)("el-button"),o=(0,t.up)("Refresh"),j=(0,t.up)("el-icon"),D=(0,t.up)("CaretLeft"),P=(0,t.up)("VideoPlay"),R=(0,t.up)("VideoPause"),Z=(0,t.up)("CaretRight"),F=(0,t.up)("Star"),ee=(0,t.up)("StarFilled"),le=(0,t.up)("el-space");return(0,t.wg)(),(0,t.j4)(le,{direction:"vertical",alignment:"flex-start"},{default:(0,t.w5)((()=>[r,(0,t.Wm)(u,{style:{width:"240px"},loading:(0,s.SU)(c),animated:"",throttle:0},{template:(0,t.w5)((()=>[(0,t._)("div",v,[(0,t._)("div",m,[(0,t.Wm)(u,{rows:8})])])])),default:(0,t.w5)((()=>[(0,t._)("div",d,[(0,t._)("div",{class:"pageBackground",style:(0,i.j5)({background:"url("+(0,s.SU)(M).uiElement.image.imageUrl+")",backgroundSize:"100% 100% "})},null,4),(0,t._)("div",g,[(0,t.Wm)(n,{type:"primary",onClick:q},{default:(0,t.w5)((()=>[(0,t.Uk)("返回")])),_:1}),(0,t._)("div",p,[(0,t._)("div",f,[((0,t.wg)(!0),(0,t.iD)(t.HY,null,(0,t.Ko)((0,s.SU)(l),((e,l)=>((0,t.wg)(),(0,t.iD)("div",{key:e.id,class:(0,i.C_)((0,s.SU)(O).id===e.al.id?"musicItem checkMusic":"musicItem"),onClick:a=>K(e,l)},[(0,t._)("span",y,(0,i.zw)(l+1),1),(0,t._)("span",w,(0,i.zw)(e.name)+(0,i.zw)(e.alia[0]?" - "+e.alia[0]:""),1),(0,t._)("span",S,(0,i.zw)(e.ar[0].name),1),(0,t._)("span",k,(0,i.zw)(e.al.name),1)],10,_)))),128))]),(0,t._)("div",U,[(0,t._)("img",{src:(0,s.SU)(M).uiElement.image.imageUrl,alt:"",style:{"border-radius":"20px"}},null,8,h),(0,t._)("div",z,(0,i.zw)((0,s.SU)(M).uiElement.mainTitle.title),1)])]),(0,s.SU)(V)?((0,t.wg)(),(0,t.iD)("div",I,[(0,t._)("div",C,[(0,t._)("img",{src:(0,s.SU)(V)?(0,s.SU)(V).al.picUrl:"",alt:""},null,8,b),(0,t._)("div",L,[(0,t._)("span",W,(0,i.zw)((0,s.SU)(V)?(0,s.SU)(V).al.name:"暂无歌曲播放"),1),(0,s.SU)(V)?((0,t.wg)(),(0,t.iD)("span",x,(0,i.zw)((0,s.SU)(V).ar[0].name),1)):(0,t.kq)("",!0)])]),(0,t._)("div",H,[(0,t._)("div",A,[(0,t.Wm)(j,null,{default:(0,t.w5)((()=>[(0,t.Wm)(o)])),_:1}),(0,t.Wm)(j,{style:{margin:"20px"},onClick:G},{default:(0,t.w5)((()=>[(0,t.Wm)(D)])),_:1}),(0,s.SU)(B)?((0,t.wg)(),(0,t.j4)(j,{key:0,style:{margin:"20px"},onClick:T},{default:(0,t.w5)((()=>[(0,t.Wm)(P)])),_:1})):((0,t.wg)(),(0,t.j4)(j,{key:1,style:{margin:"20px"},onClick:Y},{default:(0,t.w5)((()=>[(0,t.Wm)(R)])),_:1})),(0,t.Wm)(j,{style:{margin:"20px"},onClick:Q},{default:(0,t.w5)((()=>[(0,t.Wm)(Z)])),_:1}),(0,s.SU)(E)?((0,t.wg)(),(0,t.j4)(j,{key:3,onClick:$,style:{color:"yellow"}},{default:(0,t.w5)((()=>[(0,t.Wm)(ee)])),_:1})):((0,t.wg)(),(0,t.j4)(j,{key:2,onClick:X},{default:(0,t.w5)((()=>[(0,t.Wm)(F)])),_:1}))]),N])])):((0,t.wg)(),(0,t.iD)("div",J," 请选择音乐 "))])])])),_:1},8,["loading"])])),_:1})}}},O=a(89);const j=(0,O.Z)(M,[["__scopeId","data-v-2c78cb8e"]]);var D=j}}]);
//# sourceMappingURL=820.11072ef7.js.map