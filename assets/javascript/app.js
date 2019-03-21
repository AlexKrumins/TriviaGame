// https://osric.com/chris/accidental-developer/2012/07/javascript-array-sort-random-ordering/
<script type="text/javascript">
  var arr = ['apple','cat','Adam','123','Zorro','petunia']; 
  var n = arr.length;
  var tempArr = [];
  for ( var i = 0; i < n-1; i++ ) {
    // The following line removes one random element from arr
    // and pushes it onto tempArr
    tempArr.push(arr.splice(Math.floor(Math.random()*arr.length),1)[0]);
  }
  // Push the remaining item onto tempArr
  tempArr.push(arr[0]);
  arr=tempArr;
</script>