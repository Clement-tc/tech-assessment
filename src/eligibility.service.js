class EligibilityService {
    /**
     * Compare cart data with criteria to compute eligibility.
     * If all criteria are fulfilled then the cart is eligible (return true).
     *
     * @param cart
     * @param criteria
     * @return {boolean}
     */
  
  
  
  handleCondition(cartElement,criteriaElement,condition){
    /*return a boolean to know if the object value respect the criteria condition*/
    switch(condition){
      case("gt"):
        return cartElement>criteriaElement
      case("lt"):
        return cartElement<criteriaElement
      case("gte"):
        return cartElement>=criteriaElement
      case("lte"):
        return cartElement<= criteriaElement
      
  
      case("and"):
        for (var c in criteriaElement){
          if(!this.handleCondition(cartElement,criteriaElement[c],c)){
            return false
          }
        }
        return true
      
  
      case("in"):
        if(Array.isArray(cartElement)){
          for(const x of cartElement){
            if (criteriaElement.includes(x)){
              return true
            }
          }
          return false
        }
        console.log("inside in ","cartelement", cartElement,"criteriaelement:",criteriaElement,"resutl :",criteriaElement.includes(cartElement))
        return criteriaElement.includes(cartElement)
  
      case("or"):
        for (var c in criteriaElement){
          if(this.handleCondition(cartElement,criteriaElement[c],c)){
            return true
          }
        }
        return false
      
    }
  }
  
  getObjectValue(object,key){
    /*return the value of an object with his key as a parameter*/
    const keySplit = key.split('.');
    if (keySplit.length === 1) {
      if (Array.isArray(object)) {
        var valuesArray=[]
        for(const o of object){
          valuesArray.push(o[key])
        }

        return valuesArray
      } else {
        return object[key];
      }
    } else {
      const condition = keySplit.shift();
      if (object[condition] === undefined) {
        return undefined;
      } else {
        return this.getObjectValue(object[condition], keySplit.shift());
      }
    }
  
}

  isValidObject(cartValue,criteriaValue){
    /*this function return a boolean to indicate if the object respect the condition  */
    if(typeof(criteriaValue)!="object"){
      if(Array.isArray(cartValue)){
        return cartValue.includes(criteriaValue)
        }else{
          return cartValue==criteriaValue
        }
      
    }else{
      return this.handleCondition(cartValue,Object.values(criteriaValue)[0],Object.keys(criteriaValue)[0])
      
    }
    
  }
  
    isEligible(cart, criteria) {
      /*return a boolean that signifie if the cart validate all the criteria passed in parameter*/
      if( Object.keys(criteria).length === 0){//when criteria has no input
        return true
      }
  
      if( Object.keys(cart).length === 0){//when cart has no attributs
        return false
      }
  
      for( var key in criteria){ //Loop over each criteria
        const cartValue=this.getObjectValue(cart , key)
        const criteriaValue = criteria[key]

        if(cartValue==undefined){
          return false
        }
          if(!this.isValidObject(cartValue,criteriaValue)){
            return false
          }

    }
  
      return true;
    }
  }
  
  module.exports = {
    EligibilityService,
  };
  
