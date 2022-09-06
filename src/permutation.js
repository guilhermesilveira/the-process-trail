
function popRandom(v) {
    const n = v.length;
    const index = Math.floor(Math.random() * n);
    const k = v[index];
    v.splice(index, 1);
    return k;
  }
  
  function permutation(n) {
    
    const v = [];
    for (let i = 0; i < n; i++)
        v.push(i + 1);
    
    const perm = [];
    while(v.length > 0)
      perm.push(popRandom(v));
    
    return perm;
  }
  