const root=document.getElementById('LoanApp');
if(root){
  const $=id=>root.querySelector('#'+id);
  const money=n=>'$'+n.toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2});
  function calc(){
    const P=parseFloat($('ln-amt').value)||0,ar=parseFloat($('ln-rate').value)||0,yrs=parseFloat($('ln-term').value)||0;
    const n=Math.round(yrs*12),r=ar/1200;
    if(P<=0||n<=0){$('ln-out').innerHTML='<div>Enter amount and term</div>';$('ln-sched').innerHTML='';return;}
    const m=r===0?P/n:P*r*Math.pow(1+r,n)/(Math.pow(1+r,n)-1),total=m*n,interest=total-P;
    $('ln-out').innerHTML='<div><div class="k">Monthly</div><div class="v">'+money(m)+'</div></div>'+
      '<div><div class="k">Total paid</div><div class="v">'+money(total)+'</div></div>'+
      '<div><div class="k">Total interest</div><div class="v">'+money(interest)+'</div></div>';
    let bal=P,rows='<table><tr><th>Year</th><th>Principal</th><th>Interest</th><th>Balance</th></tr>';
    for(let y=1;y<=Math.ceil(n/12)&&bal>0.005;y++){let pp=0,ii=0;for(let mo=0;mo<12&&(y-1)*12+mo<n;mo++){const int=bal*r;let pr=m-int;if(pr>bal)pr=bal;bal-=pr;pp+=pr;ii+=int;}rows+='<tr><td>'+y+'</td><td>'+money(pp)+'</td><td>'+money(ii)+'</td><td>'+money(Math.max(0,bal))+'</td></tr>';}
    $('ln-sched').innerHTML=rows+'</table>';
  }
  $('ln-calc').addEventListener('click',calc);calc();
}
