function _arrSum(arr) {
    let sumArr = [];
    arr = arr.sort((n, p) => n - p)
    let len = arr.length;
    
    for (let i = 0; i < arr.length - 2; i++) {
      if (i > 0 && arr[i] === arr[i - 1]) {
        continue;
      }

      let start = i + 1;
      let end = len - 1;
    
    
      while(start < end) {
        if (arr[i] + arr[start] + arr[end] > 0) {
          end--;
  
          while(start < end && arr[end] === arr[end + 1]) {
            end--;
          }
        } else if (arr[i] + arr[start] + arr[end] < 0) {
          start++;
          while(start < end && arr[start] === arr[start - 1]) {
            start++;
          }
        } else {
          sumArr.push([arr[i], arr[start], arr[end]])


          end--;
          start++;

          while(start < end && arr[start] === arr[start - 1]) {
            start++;
          }

          while(start < end && arr[end] === arr[end + 1]) {
            end--;
          }
        }
      }
    
    }
    
    return sumArr;
  
  }
  
  console.log(_arrSum([-1, 0, 1, 2, -1, -4]))