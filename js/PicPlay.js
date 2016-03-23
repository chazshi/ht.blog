function rnd(n, m)
{
	return Math.random()*(m-n)+n;
}
function setStyle(obj, json)
{
	if(obj.length)
	{
		for(var i=0;i<obj.length;i++)
		{
			setStyle(obj[i], json);
		}
	}
	else
	{
		for(var i in json)
		{
			obj.style[i]=json[i];
		}
	}
}
document.onmousedown=function ()
{
	return false;
};

var buffer=zns.site.fx.buffer;
var linear=zns.site.fx.linear;
var flex=zns.site.fx.flex;

window.onload=function ()
{
	var now=0;
	var Pstyle=0;
	var oDiv=document.getElementById('img');
	var oNowBtn=document.getElementById('nowBtn');
	var ready=true;
	var W=700;
	var H=400;
	setInterval(picPlay,4000);

	function picPlay(){
		if((Pstyle%2)==0) Twist();
		if((Pstyle%2)==1) Flip();
		Pstyle++;
	}

	function next(){return (now+1)%6;}	
	
//翻转
	function Flip()
	{
		if(!ready)return;
		ready=false;
		
		var R=3;
		var C=6;
		
		var wait=R*C;
		
		var dw=Math.ceil(W/C);
		var dh=Math.ceil(H/R);
		
		oDiv.style.background='none';
		oDiv.innerHTML='';
		
		for(var i=0;i<C;i++)
		{
			for(var j=0;j<R;j++)
			{
				var oNewDiv=document.createElement('div');
				var t=Math.ceil(H*j/R);
				var l=Math.ceil(W*i/C);
				
				setStyle(oNewDiv, {
					position: 'absolute', background: 'url(imgs/'+(now+1)+'.jpg) '+-l+'px '+-t+'px no-repeat',
					left: l+'px', top: t+'px', width: dw+'px', height: dh+'px'
				});
				
				(function (oNewDiv, l, t){
					oNewDiv.ch=false;
					
					setTimeout(function (){
						linear(oNewDiv, {y:0}, {y:180}, function (now){
							if(now.y>90 && !oNewDiv.ch)
							{
								oNewDiv.ch=true;
								oNewDiv.style.background='url(imgs/'+(next()+1)+'.jpg) '+-l+'px '+-t+'px no-repeat';
							}
							
							if(now.y>90)
							{
								setStyle3(oNewDiv, 'transform', 'perspective(500px) rotateY('+now.y+'deg) scale(-1,1)');
							}
							else
							{
								setStyle3(oNewDiv, 'transform', 'perspective(500px) rotateY('+now.y+'deg)');
							}
						}, function (){
							if((--wait)==0)
							{
								ready=true;
								now=next();						
							}
						}, 22);
					}, /*(i+j*R)*120*/(i+j)*200);
				})(oNewDiv, l, t);
				
				oDiv.appendChild(oNewDiv);
			}
		}
	};

//扭曲
	function Twist()
	{
		if(!ready)return;
		ready=false;
		var C=7;
		
		var wait=C;
		
		var dw=Math.ceil(W/C);
		
		oDiv.style.background='none';
		oDiv.innerHTML='';
		
		for(var i=0;i<C;i++)
		{
			var oNewDiv=document.createElement('div');
			
			setStyle(oNewDiv, {
				width: dw+'px', height: '100%', position: 'absolute', left: W*i/C+'px', top: 0
			});
			setStyle3(oNewDiv, 'transformStyle', 'preserve-3d');
			setStyle3(oNewDiv, 'transform', 'perspective(1000px) rotateX(0deg)');
			//setStyle3(oNewDiv, 'transition', '0.5s all linear');
			
			(function (oNewDiv,i){
				oNewDiv.style.zIndex=C/2-Math.abs(i-C/2);
				
				setTimeout(function (){
					buffer(oNewDiv, {a:0, x:0}, {a:100, x:-90}, function (now){
						setStyle3(oNewDiv, 'transform', 'perspective(1000px) rotateY('+((3*(i-C/2))*(50-Math.abs(now.a-50))/50)+'deg) rotateX('+now.x+'deg)');
					}, function (){
						if(--wait==0)
						{
							ready=true;
						}
						now=next();
					}, 8);
					//setStyle3(oNewDiv, 'transform', 'perspective(1000px) rotateY('+3*(i-C/2)+'deg) rotateX(-45deg)');
				}, (i+1)*130);
			})(oNewDiv,i);
			
			oNewDiv.innerHTML='<div></div><div></div><div></div><div></div>';
			
			var oNext=oNewDiv.getElementsByTagName('div')[0];
			var oNow=oNewDiv.getElementsByTagName('div')[1];
			var oBack=oNewDiv.getElementsByTagName('div')[2];
			var oBack2=oNewDiv.getElementsByTagName('div')[3];
			
			setStyle([oNext, oNow, oBack, oBack2], {width: '100%', height: '100%', position: 'absolute', left: 0, top: 0});
			setStyle(oNext, {
				background: 'url(imgs/'+(next()+1)+'.jpg) '+-W*i/C+'px 0px no-repeat'
			});
			setStyle3(oNext, 'transform', 'scale3d(0.836,0.836,0.836) rotateX(90deg) translateZ('+H/2+'px)');
			
			setStyle(oNow, {
				background: 'url(imgs/'+(now+1)+'.jpg) '+-W*i/C+'px 0px no-repeat'
			});
			setStyle3(oNow, 'transform', 'scale3d(0.834,0.834,0.834) rotateX(0deg) translateZ('+H/2+'px)');
			
			setStyle(oBack, {
				background: '#666'
			});
			setStyle3(oBack, 'transform', 'scale3d(0.834,0.834,0.834) rotateX(0deg) translateZ(-'+H/2+'px)');
			
			setStyle(oBack2, {
				background: '#666'
			});
			setStyle3(oBack2, 'transform', 'scale3d(0.834,0.834,0.834) rotateX(90deg) translateZ(-'+H/2+'px)');
			
			oDiv.appendChild(oNewDiv);
		}
	};	
};
