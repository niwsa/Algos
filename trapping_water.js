//ES6 code
function nofGreaterthan0(total,cur) {
    if(cur!=0) { return total+=1;} else { return total;}
}

function trappingWater(N, array) {
    let q = 0;
    if(N < 3) {
	    return q;
    }
    while (array.reduce(nofGreaterthan0,0)>1) {
        let i=0;
        let trail; //ES5 set trail=false, let has block scoping
        let trailQuant = 0;
        while (i < N) {     
            if (array[i] === 0 && trail) {
                trailQuant++;
            } else if (array[i] !== 0 && trail && trailQuant) {
                q+=trailQuant;
                trailQuant=0;
            } else if (array[i] !== 0 && !trail) {
                trail = true;
            }
            i++;
        }
        array.forEach(function(element,index,array) {
            if(element!==0) {
                array[index]--;
            }
        });
    }
    return q;

}
exports.trappingWater = trappingWater;
