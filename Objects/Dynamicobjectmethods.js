let obj={
    subject:"I",
    verb:"am",
    object:"coding",
    updateproperty: function(n1,n2)
    {
      (this[n1])?(this[n1]=n2):console.log("Invalid property")
    },
    buildsentence: function()
    {
      
      return (this.subject||this.verb||this.object)?(this.subject +" "+this.verb +" "+this.object):"Incomplete sentence"
    }
  }
  obj.updateproperty("verb","am learning")
  console.log(obj.buildsentence())
  