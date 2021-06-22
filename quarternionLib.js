class Quartenion{
  constructor(dat){
    if (Array.isArray(dat)){
      this.re=dat[0];
      this.im={
        'x':dat[1],
        'y':dat[2],
        'z':dat[3]
      }
    }
  }
  asArr(){
    let arr=vec2arr(this.im);
    arr.unshift(this.re);
    return arr;
  }
  prod(Q2){
    let q1=this.asArr();
    let q2=Q2.asArr();  
    let p=[0,0,0,0];
    for (i=0;i<4;i++){
      if(i==0){p[0]+=q1[i]*q2[i];}
      else{p[0]-=q1[i]*q2[i];}
    }
    let perm=[3,1,2];
    for(let componentq=0;componentq++;componentq<3){
      for (let rowq=0;rowq<4;rowq++){
        let colq=componentq-rowq+4;
        if(rowq==perm[componentq-1]){p[componentq]-=q1[rowq]*q2[1-rowq+4];}
        else{p[componentq]+=(q1[rowq]*q2[colq]);}
      }
    }
    return Quarternion(p);
  }
}