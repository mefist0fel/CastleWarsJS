const aa=Number.MAX_VALUE,ca=Number.MIN_VALUE,da=Math.PI,ea=Math.cos,fa=Math.sin,ha=Math.min,ia=Math.max,ja=Math.round;function n(a){return ia(ha(a,1),0)}function ka(a,b){return[a[0]-b[0],a[1]-b[1]]}function qa(a){return Math.sqrt(a[0]*a[0]+a[1]*a[1])}function ra(a){var b=1/qa(a);Infinity==b&&(b=aa);-Infinity==b&&(b=ca);return[a[0]*b,a[1]*b]}function v(a=0,b=0,e=0){return[a,b,e]}function x(a,b){return[a[0]+b[0],a[1]+b[1],a[2]+b[2]]}function y(a,b){return[a[0]*b,a[1]*b,a[2]*b]};function A(a,b){sa.addEventListener(a,b,!1)};function ta(){this.L=function(a){for(var b=0;24>b;b++)this[String.fromCharCode(97+b)]=a[b]||0;.01>this.c&&(this.c=.01);a=this.b+this.c+this.e;.18>a&&(a=.18/a,this.b*=a,this.c*=a,this.e*=a)}}
var wa=new function(){this.L=new ta;var a,b,e,f,k,h,m,l,q,z,r,p;this.ia=function(){var c=this.L;f=100/(c.f*c.f+.001);k=100/(c.g*c.g+.001);h=1-c.h*c.h*c.h*.01;m=-c.i*c.i*c.i*1E-6;c.a||(r=.5-c.n/2,p=5E-5*-c.o);l=1+c.l*c.l*(0<c.l?-.9:10);q=0;z=1==c.m?0:(1-c.m)*(1-c.m)*2E4+32};this.qa=function(){this.ia();var c=this.L;a=c.b*c.b*1E5;b=c.c*c.c*1E5;e=c.e*c.e*1E5+12;return 3*((a+b+e)/3|0)};this.pa=function(c,d){var g=this.L,t=1!=g.s||g.v,w=g.v*g.v*.1,L=1+3E-4*g.w,V=g.s*g.s*g.s*.1,Cb=1+1E-4*g.t,Db=1!=g.s,
Eb=g.x*g.x,Fb=g.g,Wa=g.q||g.r,Gb=g.r*g.r*g.r*.2,Xa=g.q*g.q*(0>g.q?-1020:1020),Ya=g.p?((1-g.p)*(1-g.p)*2E4|0)+32:0,Hb=g.d,Za=g.j/2,Ib=g.k*g.k*.01,Ea=g.a,Fa=a,Jb=1/a,Kb=1/b,Lb=1/e;g=5/(1+g.u*g.u*20)*(.01+V);.8<g&&(g=.8);g=1-g;for(var Ga=!1,$a=0,la=0,ma=0,ab=0,ua=0,na,oa=0,H,W=0,X,Ha=0,u,bb=0,ba,cb=0,va=Array(1024),pa=Array(32),J=va.length;J--;)va[J]=0;for(J=pa.length;J--;)pa[J]=2*Math.random()-1;for(J=0;J<d;J++){if(Ga)return J;Ya&&++bb>=Ya&&(bb=0,this.ia());z&&++q>=z&&(z=0,f*=l);h+=m;f*=h;f>k&&(f=k,
0<Fb&&(Ga=!0));H=f;0<Za&&(cb+=Ib,H*=1+Math.sin(cb)*Za);H|=0;8>H&&(H=8);Ea||(r+=p,0>r?r=0:.5<r&&(r=.5));if(++la>Fa)switch(la=0,++$a){case 1:Fa=b;break;case 2:Fa=e}switch($a){case 0:ma=la*Jb;break;case 1:ma=1+2*(1-la*Kb)*Hb;break;case 2:ma=1-la*Lb;break;case 3:ma=0,Ga=!0}Wa&&(Xa+=Gb,X=Xa|0,0>X?X=-X:1023<X&&(X=1023));t&&L&&(w*=L,1E-5>w?w=1E-5:.1<w&&(w=.1));ba=0;for(var Mb=8;Mb--;){W++;if(W>=H&&(W%=H,3==Ea))for(na=pa.length;na--;)pa[na]=2*Math.random()-1;switch(Ea){case 0:u=W/H<r?.5:-.5;break;case 1:u=
1-W/H*2;break;case 2:u=W/H;u=6.28318531*(.5<u?u-1:u);u=1.27323954*u+.405284735*u*u*(0>u?1:-1);u=.225*((0>u?-1:1)*u*u-u)+u;break;case 3:u=pa[Math.abs(32*W/H|0)]}t&&(na=oa,V*=Cb,0>V?V=0:.1<V&&(V=.1),Db?(ua+=(u-oa)*V,ua*=g):(oa=u,ua=0),oa+=ua,ab+=oa-na,u=ab*=1-w);Wa&&(va[Ha%1024]=u,u+=va[(Ha-X+1024)%1024],Ha++);ba+=u}ba*=.125*ma*Eb;c[J]=1<=ba?32767:-1>=ba?-32768:32767*ba|0}return d}};
window.jsfxr=function(a){wa.L.L(a);var b=wa.qa();a=new Uint8Array(4*((b+1)/2|0)+44);b=2*wa.pa(new Uint16Array(a.buffer,44),b);var e=new Uint32Array(a.buffer,0,44);e[0]=1179011410;e[1]=b+36;e[2]=1163280727;e[3]=544501094;e[4]=16;e[5]=65537;e[6]=44100;e[7]=88200;e[8]=1048578;e[9]=1635017060;e[10]=b;b+=44;e=0;for(var f="data:audio/wav;base64,";e<b;e+=3){var k=a[e]<<16|a[e+1]<<8|a[e+2];f+="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[k>>18]+"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[k>>
12&63]+"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[k>>6&63]+"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[k&63]}return f};var B=[],xa=v(1,0,0),ya=v(0,1,0),za=v(0,0,1),Aa=v(0,0,-20),Ba=v(),Ca=null,Da=1.6,Ia=1;function Ja(){var a=Ka;let b=a/180*da;a=(a/180+.5)*da;xa=v(ea(b),.6*fa(b),fa(b));ya=v(ea(a),.6*fa(a),fa(a));za=v(0,-.6,2)}function La(a,b){return a.depth<b.depth?1:a.depth>b.depth?-1:0}function Ma(a){a=x(a,y(Ba,-1));a=x(x(y(xa,a[0]),y(ya,a[1])),y(za,a[2]));a=x(a,Aa);a=y(a,Da*Ia*(1+1E-4*a[2]));return x(a,Ca)}
function Na(a,b,e,f,k=v(1,1,1),h=0){var m={ga:[a,b,e,f],depth:0,color:k,enable:!0,Y(l,q,z,r,p=null){this.points=[l,q,z,r];if(null==p){l=m.points;q=v();for(z=0;z<l.length;z++)q=x(q,l[z]);l=y(q,1/parseFloat(l.length))}else l=p;this.position=l;this.position[2]=0},setColor(l){m.color=l},fa(){if(m.enable){m.depth=-Ma(m.position)[2]+h;for(let l=0;l<m.ga.length;l++)m.ga[l]=Ma(m.points[l])}},aa(){m.enable&&(C.fillStyle=Oa(m.color),Pa(m.ga))}};m.Y(a,b,e,f);B.push(m);return m}
function Pa(a){var b=a[0],e=ka(a[1],b);e=ra([e[1],-e[0]]);b=ka(b,a[2]);if(!(0<e[0]*b[0]+e[1]*b[1])){C.beginPath();b=a[3];C.moveTo(b[0],b[1]);for(b=0;4>b;b++)C.lineTo(a[b][0],a[b][1]);C.closePath();C.fill()}}function Oa(a){let b=ja(255*n(a[0])),e=ja(255*n(a[1]));a=ja(255*n(a[2]));return Qa(b,e,a)}function Qa(a,b,e){function f(k){k=k.toString(16);return 1==k.length?"0"+k:k}return"#"+f(a)+f(b)+f(e)+f(255)};let D=Array,Ra=[];const Sa=[v(-1,1),v(-1,-1),v(1,1),v(1,-1)];
function Ta(a,b,e=-1,f=0){function k(c,d,g,t,w=null){d=h(d,g,t);return 0<=d&&d<c.length?c[d]:w}function h(c,d,g=1,t=1){return c*g+d*t}function m(c,d,g){c>d?(c-=g,c<d&&(c=d)):(c+=g,c>d&&(c=d));return c}let l=4*a,q={G:D(a*a),K:D(a*a),points:D(a*a*4),F:D(a*a),H:D(a*a),Z:D(a*a),T:D(a*a),S:D(a*a),size:a,ha(c,d,g){var t=this.K;c=h(c,d,this.size);0<=c&&c<t.length&&(t[c]=g)},ua(c,d){return k(this.K,c,d,this.size,0)},setColor(c,d,g){var t=this.H;c=h(c,d,this.size);0<=c&&c<t.length&&(t[c]=g)},ta(c,d){return k(this.H,
c,d,this.size,v())},update(c){for(var d=0;d<this.K.length;d++)this.G[d]!=this.K[d]&&(this.G[d]=m(this.G[d],this.K[d],50*c));for(d=0;d<this.H.length;d++)if(this.F[d][0]!=this.H[d][0]||this.F[d][1]!=this.H[d][1]||this.F[d][2]!=this.H[d][2])this.F[d][0]=m(this.F[d][0],this.H[d][0],2*c),this.F[d][1]=m(this.F[d][1],this.H[d][1],2*c),this.F[d][2]=m(this.F[d][2],this.H[d][2],2*c);this.I()},I(){for(var c=0;c<this.size;c++)for(var d=0;d<this.size;d++){var g=h(c,d,this.size);g=v((c-z)*b,(d-z)*b,this.G[g]);
for(var t=0;4>t;t++){var w=h(2*c+Math.floor(t/2),2*d+t%2,l);this.points[w]=x(g,y(Sa[t],r))}}for(c=0;c<this.size;c++)for(d=0;d<this.size;d++)g=h(c,d,this.size),this.Z[g].Y(this.points[h(2*c,2*d,l)],this.points[h(2*c+1,2*d,l)],this.points[h(2*c+1,2*d+1,l)],this.points[h(2*c,2*d+1,l)]),this.Z[g].setColor(this.F[g]),this.Z[g].enable=0<=this.G[g],c<this.size-1&&(this.T[g].Y(this.points[h(2*c+1,2*d,l)],this.points[h(2*c+2,2*d,l)],this.points[h(2*c+2,2*d+1,l)],this.points[h(2*c+1,2*d+1,l)]),t=h(c+1,d,this.size),
this.G[g]>this.G[t]?(w=y(this.F[g],.8),this.T[g].enable=0<=this.G[g]):(w=y(this.F[t],.8),this.T[g].enable=0<=this.G[t]),this.T[g].setColor(w)),d<this.size-1&&(this.S[g].Y(this.points[h(2*c+1,2*d,l)],this.points[h(2*c,2*d,l)],this.points[h(2*c,2*d+3,l)],this.points[h(2*c+1,2*d+3,l)]),t=h(c,d+1,this.size),this.G[g]>this.G[t]?(w=y(this.F[g],.7),this.S[g].enable=0<=this.G[g]):(w=y(this.F[t],.7),this.S[g].enable=0<=this.G[t]),this.S[g].setColor(w))},clear(){for(var c=0;c<this.size;c++)for(var d=0;d<this.size;d++){let g=
h(c,d,this.size);this.K[g]=e}this.I()}},z=.5*(a-1),r=.5*b;for(a=0;a<q.size;a++)for(var p=0;p<q.size;p++){let c=h(a,p,q.size);q.G[c]=e;q.K[c]=e;let d=v(1,1,1);q.Z[c]=Na(d,d,d,d,d,f);q.T[c]=Na(d,d,d,d,d,f);q.S[c]=Na(d,d,d,d,d,f);q.H[c]=d;q.F[c]=v(0,0,0)}q.I();Ra.push(q);return q}function E(a,b,e){for(var f=Ua,k=0;5>k;k++)for(var h=0;5>h;h++)f.ha(a+k,b+h,6*e[5*k+h])}function Va(a,b,e,f){for(var k=Ua,h=0;h<e;h++)for(var m=0;m<e;m++)k.setColor(a+h,b+m,f)}
for(var Ua=Ta(85,10,-1E-5,-50),db=Ta(35,50,50),F=0;35>F;F++)for(var G=0;35>G;G++){let a=80*Math.random();var eb=v(F-17,G-17);let b=n(Math.sqrt(eb[0]*eb[0]+eb[1]*eb[1]+eb[2]*eb[2])/17*2.4-1);a*=b;0<F&&0<G&&34>F&&34>G||(a=-1);db.ha(F,G,a);var fb=db,gb=fb.setColor,hb=F,ib=G,jb=a/80;let e=n(.3+.1*jb),f=n(.5+.5*jb),k=n(.3+.1*jb);gb.call(fb,hb,ib,v(e,f,k))}db.I();
function kb(a){for(F=0;F<lb.length;F++)I(K,lb[F]),I(B,lb[F]);lb=[];for(F=0;F<M.length;F++)I(K,M[F]),I(B,M[F]);M=[];Ua.clear();mb.enable=!0;switch(a){case -1:a=[7,6,7,6,7,6,6,6,6,6,7,6,2,6,7,6,6,6,6,6,7,6,7,6,7];var b=[-1E-4,4,3,4,-1E-4,-1E-4,3,3,3,-1E-4,-1E-4,4,3,4,-1E-4,-1E-4,3,3,3,-1E-4,-1E-4,4,3,4,-1E-4];const e=[-1E-4,-1E-4,-1E-4,-1E-4,-1E-4,4,3,4,3,4,3,3,3,3,3,4,3,4,3,4,-1E-4,-1E-4,-1E-4,-1E-4,-1E-4];E(33,33,a);E(33,47,a);E(47,47,a);E(47,33,a);E(40,40,[15,12,15,12,15,12,12,12,12,12,15,12,12,
12,15,12,12,12,12,12,15,12,15,12,15]);E(38,33,b);E(42,33,b);E(38,47,b);E(42,47,b);E(33,38,e);E(33,42,e);E(47,38,e);E(47,42,e);Va(30,30,25,nb(0));break;case 0:N(3,3,0,1);N(-3,-3,1,1);N(1,-1);N(-1,1);ob();mb.enable=!1;break;default:case 1:N(0,6,0,2);N(0,-6,1,2);for(a=-1;2>a;a++)for(b=-1;2>b;b++)N(3*a,3*b);ob();break;case 2:N(3,3,0,1),N(-3,-3,1,1),N(0,0),N(-3,0),N(3,0),N(0,-3),N(0,3),ob()}};var M=[],O=null;
function N(a,b,e=-1,f=0){const k=[1,2,3],h=[15,20,999],m=[50,80,100],l=v(1,1,1),q=v(.5,.5,.5),z=[[-1E-4,-1E-4,-1E-4,-1E-4,-1E-4,-1E-4,4,2,4,-1E-4,-1E-4,2,0,2,-1E-4,-1E-4,4,2,4,-1E-4,-1E-4,-1E-4,-1E-4,-1E-4,-1E-4],[-1E-4,4,2,4,-1E-4,4,2,2,2,4,2,2,5,2,2,4,2,2,2,4,-1E-4,4,2,4,-1E-4],[4,2,3,2,4,2,7,5,7,2,3,5,3,5,3,2,7,5,7,2,4,2,3,2,4]];var r={A:[a,b],position:v(50*a,50*b),C:v(),N:v(),M:[10,10],D:e,U:0,la:null,target:null,level:f,B:10,X:1,R:0,ka:[],O:0,depth:0,J:null,fa(){this.C=Ma(this.position);this.N=
Ma(x(this.position,v(0,0,64)));let p=Math.abs(this.N[1]-this.C[1]);this.M=[1.2*p,p];this.depth=-this.C[2]-1E3},aa(){C.fillStyle=Oa(nb(r.D));C.fillText(r.B,r.N[0],r.N[1]);r.B>=h[r.level]&&C.fillText("^",r.N[0]+.5*this.M[0],r.N[1])},upgrade(){this.B>=h[r.level]&&(this.B-=h[r.level],this.level+=1,this.I())},update(p){this.X-=p;0>=this.X&&(this.X=1,0<=this.D&&r.B<m[r.level]&&(this.B+=k[this.level]));if(0<this.R)this.R-=p;else if(0<this.B&&0<this.U){for(p=3;0<p&&0<this.U&&0<this.B;)--this.B,--this.U,pb(this.A[0],
this.A[1],this.D,this.la,p-2),--p;this.R+=.3}else this.target=null},contains(p,c){return this.C[0]-this.M[0]<p&&this.C[1]-this.M[1]<c&&this.C[0]+this.M[0]>p&&this.C[1]+this.M[1]>c},attack(p){this.D==p?this.B+=1:0>=this.B?(this.D=p,this.I(),this.B=1):--this.B},na(p){if(null!=p&&null!=p.J){this.target=p;this.U=this.B/2;var c=[];for(c.push(p);null!=p.J;)p=p.J,c.push(p);this.la=c}},I(){E(40+5*this.A[0],40+5*this.A[1],z[this.level]);Va(40+5*this.A[0],40+5*this.A[1],5,nb(this.D));Ua.I()},sa(p){var c=-1E-5,
d=q;null!=this.J&&(c=0,d=q);p&&(c=0,d=l);p=39+5*this.A[0];for(var g=39+5*this.A[1],t=Ua,w=0;7>w;w++)for(var L=0;7>L;L++)if(0==w||0==L||6==w||6==L)t.ha(p+w,g+L,c),t.setColor(p+w,g+L,d)},va(){I(K,r);I(B,r);I(M,r)}};K.push(r);B.push(r);M.push(r);r.I()}function qb(){M.forEach(a=>a.sa(a==O));Ua.I()}function nb(a){switch(a){case 0:return v(.2,.2,1);case 1:return v(1,.2,.2);case 2:return v(.2,1,.2);default:return v(.6,.6,.6)}}
function rb(){var a=P.W;let b=a[0];a=a[1];for(var e=0;e<M.length;e++)if(M[e].contains(b,a))return M[e];return null}function ob(){for(var a=0;a<M.length;a++)for(var b=0;b<M.length;b++)a!=b&&6>qa(ka(M[a].A,M[b].A))&&M[a].ka.push(M[b])}function sb(a){M.forEach(e=>{e.O=99999;e.J=null});if(null!=a){var b=[];b.push(a);for(a.O=0;0<b.length;){let e=b.pop();e.ka.forEach(f=>{let k=e.O+qa(ka(e.A,f.A));f.O>k&&(f.O=k,f.J=e,f.D==a.D&&b.push(f))})}}};const tb=[0,0];var lb=[];
function pb(a,b,e,f,k=0){var h={offset:k,ea:[0,0],A:[a,b],position:v(50*a,50*b),C:v(),ma:v(),oa:tb,P:0,ba:e,target:null,path:[...f],B:1,fa(){this.C=Ma(this.position);this.ma=Ma(x(this.position,v(0,0,5)));this.depth=-this.C[2]-500},aa(){var m=Math.abs(this.C[2]-this.ma[2]),l=.2*m,q=.34*m;let z=[x(this.C,v(0,l)),x(this.C,v(q,0)),x(this.C,v(q,-m)),x(this.C,v(0,-m))];m=[x(this.C,v(0,l)),x(this.C,v(0,-m)),x(this.C,v(-q,-m)),x(this.C,v(-q,0))];C.fillStyle=Oa(y(nb(h.ba),.95));Pa(z);C.fillStyle=Oa(y(nb(h.ba),
.85));Pa(m)},update(m){var l=h.oa;l=[l[0]*m,l[1]*m];var q=h.A;h.A=[q[0]+l[0],q[1]+l[1]];h.position=[50*(h.A[0]+h.ea[0]*h.offset*.2),50*(h.A[1]+h.ea[1]*h.offset*.2),2*fa(30*this.P+this.offset)];h.P-=m;0>=h.P&&(0<h.path.length?(h.target=h.path.pop(),l=ka(h.target.A,h.A),m=ra(l),h.ea=[-m[1],m[0]],l=qa(l),h.oa=[1*m[0],1*m[1]],h.P=l/1):(h.target.attack(h.ba),I(K,h),I(B,h),I(lb,h)))}};K.push(h);B.push(h);lb.push(h)}function I(a,b){b=a.indexOf(b);-1<b&&a.splice(b,1)};var ub,vb=0,xb=wb(),yb=1/30,sa=document,zb=sa.getElementById("a"),C=zb.getContext("2d"),Q=1,R=1,Ab=1,Bb=1,Nb=1,S=1,Ob=sa.documentElement,Pb=0,Ka=0,K=[];Qb();
var P=function(a){for(var b={key:[200],V:!1,da:!1,ca:!1,ra:!1,W:[0,0],update(){this.da=this.V=!1}},e=0;200>e;e++)b.key[e]=!1;A("contextmenu",function(f){f.preventDefault()});A("keydown",function(f){b.key[f.keyCode]=!0});A("keyup",function(f){b.key[f.keyCode]=!1});A("click",function(){});A("mousedown",function(f){0==f.button&&(b.V=!0,b.ca=!0);2==f.button&&(b.da=!0,b.ca=!0)});A("mouseup",function(f){0==f.button&&(b.ca=!1);2==f.button&&(b.ra=!1)});A("mousemove",function(f){b.W[0]=f.clientX-a.left;b.W[1]=
f.clientY-a.top});return b}(zb.getBoundingClientRect()),mb=function(a=1,b=1){a={enable:!0,D:a,$:.5,threshold:20,update(e){this.enable&&(this.$-=e,0>this.$&&(this.$=.5+Math.random()*b,M.forEach(f=>{f.D==this.D&&(f.B>this.threshold&&(3<f.level&&this.ja(f),.3>Math.random()?f.upgrade():this.ja(f)),this.threshold=20+Math.random(15))})))},ja(e){sb(e);let f=[];M.forEach(k=>{k!=e&&null!=k.J&&k.D!=this.D&&f.push(k)});0==f.length&&M.forEach(k=>{k!=e&&null!=k.J&&k.D==this.D&&f.push(k)});0<f.length&&e.na(f[Math.floor(Math.random()*
f.length)])}};K.push(a);return a}(),T=0,Rb=null;Da=.7;U(0);Y();function Sb(){C.fillStyle="#101010";C.fillRect(0,0,Q,R);for(var a=0;a<B.length;a++)B[a].fa();B.sort(La);for(a=0;a<B.length;a++)B[a].aa()}function U(a){0==a?(kb(-1),Rb=Tb):-1==a?(kb(T),Rb=Ub):-2==a?Rb=Vb:-3==a?Rb=Wb:1==a&&(Rb=Xb)}function Yb(a){Ka+=8*a;360<Ka&&(Ka-=360);Ja()}function Zb(a){Pb+=.1*a;Ka=.9*Ka+.1*(10*fa(Pb)+65);Ja()}
function Vb(a){Yb(a);Ra.forEach(b=>b.update(a));Sb();C.fillStyle="#66FF66";Y(60);$b("WIN",-35);Y();Z("MENU",0,0,18)&&U(0);Z("NEXT",0,20,18)&&(T+=1,U(-1));P.key[27]&&U(0)}function Wb(a){Yb(a);Ra.forEach(b=>b.update(a));Sb();C.fillStyle="#FF6666";Y(60);$b("LOSE",-35);Y();Z("MENU",0,0,18)&&U(0);Z("RESTART",0,20,18)&&U(-1);P.key[27]&&U(0)}
function Tb(a){Da=1.6*.05+.95*Da;Yb(a);Ra.forEach(b=>b.update(a));Sb();C.fillStyle="#FFFFFF";Y(60);$b("CASTLE WARS",-35);Y();Z("START",0,20,18)&&U(-1);P.key[32]&&U(-1)}function Ub(a){Ra.forEach(b=>b.update(a));Zb(a);Sb();C.fillStyle="#FFFFFF";Y(40);$b("SELECT LEVEL",-35);0<T&&$b(T,-25);Y();Z("START",0,20,18)&&U(1);P.key[32]&&U(1);P.key[27]&&U(0);if(Z(">>",16,20,9)||P.key[39])T+=1,kb(T);if(0<T&&Z("<<",-16,20,9)||P.key[37])--T,kb(T)}
function Xb(a){Ra.forEach(f=>f.update(a));P.key[27]&&U(0);P.V&&(O=rb(),null!=O&&0!=O.D&&(O=null),sb(O),qb());if(P.da){let f=rb();null!=O&&null!=f&&(O==f?O.upgrade():(sb(O),O.na(f)))}let b=0,e=0;M.forEach(f=>{0==f.D&&(b+=1);1==f.D&&(e+=1)});0==b&&U(-3);0==e&&U(-2);K.forEach(f=>f.update(a));Zb(a);Sb()}function wb(){let a=window.performance;return a&&a.now?a.now():(new Date).getTime()}let ac=requestAnimationFrame;
function bc(){ub=wb();vb=Math.min(1,(ub-xb)/1E3);vb>yb&&(vb=yb);xb=ub;Rb(vb);ac(bc);P.update();Q==Ob.clientWidth&&R==Ob.clientHeight||Qb()}ac(bc);function Qb(){Q=Ob.clientWidth;R=Ob.clientHeight;Ab=Math.min(Q,R);Bb=.5*Q;Nb=.5*R;S=.01*Ab;zb.width=Q;zb.height=R;var a=Q,b=R;Ca=v(.5*a,.5*b);Ia=Math.min(a,b)/1024}function Y(a=24){R>Q&&(a*=R/Q);C.font=parseInt(a)+"pt Arial";C.textAlign="center"}function $b(a,b){C.fillText(a,0*S+Bb,b*S+Nb)}
function Z(a,b,e,f){f=f*S*.5;let k=3*S;b=b*S+Bb;e=e*S+Nb;C.fillStyle="#66666699";C.fillRect(b-f,e-k-12,2*f,2*k);C.fillStyle="#FFFFFF";C.fillText(a,b,e);return P.V&&(a=P.W,b-f<a[0]&&e-k<a[1]&&b+f>a[0]&&e+k>a[1])?(P.update(1),!0):!1};
