let Policies = [
    { policyHolder: "Rohit", daysLate: 5, policyType: "Health", isPremiumMember: false },
    { policyHolder: "Ayesha", daysLate: 8, policyType: "Car", isPremiumMember: true },
    { policyHolder: "Neel", daysLate: 2, policyType: "Life", isPremiumMember: false }
  ]
  
  /*Fine rules:
  - ₹30 per day for Health insurance
  - ₹50 per day for Car insurance
  - ₹40 per day for Life insurance
  - Premium members get 40% discount
  - Maximum fine limit ₹1000 per policy
  */
 let fine =Policies.reduce((acc,curr)=>{
    if(curr.policyType=="Health")
    {
      curr=curr.daysLate*30
    }
    if(curr.policyType=="Car")
        {
        curr=curr.daysLate*50
        }
    if(curr.policyType=="Life")
        {
        curr=curr.daysLate*40
        }
    acc=acc+curr
    return acc

 },0)

 console.log(fine)
  