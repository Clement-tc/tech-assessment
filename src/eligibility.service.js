class EligibilityService {
    /**
     * Compare cart data with criteria to compute eligibility.
     * If all criteria are fulfilled then the cart is eligible (return true).
     *
     * @param cart
     * @param criteria
     * @return {boolean}
     */
  
  
  
    handleCondition(cartElement,criteriaElement,condition){//return result for each condition
      if(condition=="gt"){
        return cartElement>criteriaElement
      }
      if(condition=="lt"){
        return cartElement<criteriaElement
      }
      if(condition=="gte"){
        return cartElement>=criteriaElement
      }
      if(condition=="lte"){
        return cartElement<= criteriaElement
      }
  
      if(condition=="and"){
        for (var c in criteriaElement){
          if(!this.handleCondition(cartElement,criteriaElement[c],c)){
            return false
          }
        }
        return true
      }
  
      if(condition=="in"){
        return criteriaElement.includes(cartElement)
      }
  
      if(condition=="or"){
        for (var c in criteriaElement){
          if(this.handleCondition(cartElement,criteriaElement[c],c)){
            return true
          }
        }
        return false
      }
    }
  
  
  
    isEligible(cart, criteria) {
      // TODO: compute cart eligibility here.
      if( Object.keys(criteria).length === 0){//when criteria has no input
        return true
      }
  
      if( Object.keys(cart).length === 0){//when cart has no attributs
        return false
      }
      const condition=["gt","lt", "gte", "lte","and","in","or"]
  
  
      for( var key in criteria){ //Loop over each criteria
        var cartValue = cart[key]
        const criteriaValue = criteria[key]
  
        if(key.includes('.')){//check if sub object respect condition
          const target=key.split('.')
          const dotKey=target[0]
          const subObject=target[1]
  
          if(cart[dotKey]==undefined && (cart[dotKey][subObject]==undefined || cart[dotKey].length==0)){//sort out bad input in criteria
            return false
          }
  
          cartValue=[]
          for(var x in cart[dotKey]){
            if(Array.isArray(cart[dotKey])){
              cartValue.push(cart[dotKey][x][subObject])
            }else{
              cartValue.push(cart[dotKey][x])
            }
          }
  
          return cartValue.includes(criteriaValue)
          
        }else{
  
  
  
          if(typeof(criteriaValue)!="object"){//default verification with no condition, ==
            if(cartValue!=criteriaValue){
              return false
            }
          }else{//verification with condition
            if(condition.includes(Object.keys(criteriaValue)[0])){
              if(!this.handleCondition(cartValue,Object.values(criteriaValue)[0],Object.keys(criteriaValue)[0])){
                return false
              }
            }
          }
  
      }
    }
  
      return true;
    }
  }
  
  module.exports = {
    EligibilityService,
  };
  
