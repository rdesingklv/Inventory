// Import the page's CSS. Webpack will know what to do with it.


// Import libraries we need.
import { default as Web3} from 'web3'
import { default as contract } from 'truffle-contract'

// Import our contract artifacts and turn them into usable abstractions.

//import BasicToken from '../../build/contracts/BasicToken.json'
import Inventory from '../../build/contracts/Inventory.json'
//import Owned from '../../build/contracts/owned.json'

// MetaCoin is our usable abstraction, which we'll use through the code below.

//var tokens = contract(BasicToken);
var inventory = contract(Inventory);
//var owned = contract(Owned);
// The following code is simple to show off interacting with your contracts.
// As your needs grow you will likely need to change its form and structure.
// For application bootstrapping, check out window.addEventListener below.
var accounts;
var account;
var cus;
var productList;
var productCount;
var productId;

window.App = {
  start: function() {
    var self = this;
    var r=11;
    

    // Bootstrap the MetaCoin abstraction for Use.
   //tokens.setProvider(web3.currentProvider);
    inventory.setProvider(web3.currentProvider);

    // Get the initial account balance so it can be displayed.
    web3.eth.getAccounts(function(err, accs) {
      if (err != null) {
        alert("There was an error fetching your accounts.");
        return;
      }

      if (accs.length == 0) {
        alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
        return;
      }
      accounts = accs;
      account = accounts[0];
      
      //self.ViewProduct();
      // self.product();
    });
  },

  totalSupply: function(){
      var self = this;
      var meta;
      
      inventory.deployed().then(function(instance){
        meta = instance;
        return meta.totalSupply();
        
      }).then(function(re){
        //var amount = document.getElementById("ts");
        console.log(re);
        document.getElementById("ts").value=re;
        //amonut.value = t;
      }).catch(function(e){
        console.log(e);
      });
    },

    balance:function(){
      var self = this;
      var owner = document.getElementById("owner").value;
      var meta;
      inventory.deployed().then(function(instance){
        meta = instance;
        return meta.balanceOf(owner);
      }).then(function(result) {
        // self.setStatus("Transaction complete!");
        document.getElementById("ba").value=result;
        
         //self.refreshBalance();
       }).catch(function(e) {
         console.log(e);
         //self.setStatus("Error sending coin; see log.");
       });
     },

     transfer:function(){
       var self = this;
       var meta;
       var toaddress =document.getElementById("toaddress").value;
       var value = parseInt(document.getElementById("value").value); 
       
       
       inventory.deployed().then(function(instance){
        meta = instance;
        return meta.transfer(toaddress,value,{from:account,gas:6000000});
      }).then(function(result) {
      
        // self.setStatus("Transaction complete!");
        var res=document.getElementById("ts").value = result;
       
         
       }).catch(function(e) {
         console.log(e);
         //self.setStatus("Error sending coin; see log.");
       });
     },
      
   sendether:function(){
    var self = this;
    var ether= document.getElementById("ether").value;
    var meta;
    inventory.deployed().then(function(instance){
     meta = instance;
     return meta.sendEther({from:account,value:web3.toWei(ether,"ether"),gas:6000000});
   }).then(function(result) {
     // self.setStatus("Transaction complete!");
     
     document.getElementById("ba").value=result;
     
     
    }).catch(function(e) {
      console.log(e);
      //self.setStatus("Error sending coin; see log.");
    });
  },
      customer: function(){
      var self = this;
      var meta;
      var add = document.getElementById("add").value;
        
        inventory.deployed().then(function(instance){
          meta = instance;
          return meta.cust(add,{from:account,gas:6000000});
        }).then(function(result) {
           
          //document.getElementById("cs").value=result;
           
         }).catch(function(e) {
           console.log(e);
           //self.setStatus("Error sending coin; see log.");
         });
       },  

       product: function(){
        var self = this;
        var meta;
        var a = parseInt(document.getElementById("id1").value);
        var b = document.getElementById("name1").value;
        var c = document.getElementById("brand1").value;
        var d = 0;//parseInt(document.getElementById("quantity1").value);
        var e = 0;//parseInt(document.getElementById("price1").value);
      
        //document.getElementById("id").value=document.getElementById("id1").value;
        //document.getElementById("name").value=document.getElementById("name1").value;
        // document.getElementById("brand").value=document.getElementById("brand1").value;
        //console.log(a,b,c,d,e);
          inventory.deployed().then(function(instance){
            meta = instance;
            return meta.p_details(a,b,c,d,e,{from:account,gas:6000000});
           
          }).then(function(result) {
              console.log(result); 
           
           }).catch(function(e) {
             console.log(e);
           });
         },  
         
         Cutomerorder: function(){
          var self = this;
          var meta;
          var a = parseInt(document.getElementById("orid").value);
          var b = parseInt(document.getElementById("id2").value);
          var c = document.getElementById("cid").value;
          var d = parseInt(document.getElementById("qnty").value);
          
         
          inventory.deployed().then(function(instance){
            meta = instance;
            return meta.order(a,b,c,d,{from:account,gas:6000000});
            
          }).then(function(result) {
            alert("ordered");
            console.log(result);
            
          }).catch(function(e) {
             console.log(e);
      
           });
         },  
         
         purchase: function(){
          var self = this;
          document.getElementById("id").value=document.getElementById("id1").value;
          document.getElementById("name").value=document.getElementById("name1").value;
          document.getElementById("brand").value=document.getElementById("brand1").value;
          var a = parseInt(document.getElementById("id").value);
          var b = document.getElementById("name").value;
          var c = document.getElementById("brand").value;
          var d = parseInt(document.getElementById("quantity").value);
          var e = parseInt(document.getElementById("price").value);
          var meta;
          
          inventory.deployed().then(function(instance){
            meta = instance;
            return meta.purchase_order(a,b,c,d,e,{from:account,gas:6000000});
          }).then(function(result) {
            console.log(result);  
           }).catch(function(e) {
             console.log(e);
             //self.setStatus("Error sending coin; see log.");
           });

         },
         Addproduct :  function(){
          var self = this;
          var a = parseInt(document.getElementById("id4").value);
          var b = document.getElementById("addname").value;
          var c = document.getElementById("addbrand").value;
          var d = parseInt(document.getElementById("addquantity").value);
          
          var meta;
          inventory.deployed().then(function(instance){
            meta = instance;
            return meta.addproducts(a,b,c,d,{from:account,gas:6000000});
          }).then(function(result) {
            // self.setStatus("Transaction complete!");
            //document.getElementById("AO").value= result;
            alert("added");
        
             
           }).catch(function(e) {
             console.log(e);
             //self.setStatus("Error sending coin; see log.");
           });
          }, 

          ViewProduct :function(){
            var self = this;
            var meta;
            $("#product_list").html('')
            inventory.deployed().then(function(instance){
              meta = instance;
                return meta.purchaseOrder();
              }).then(function(val) {
                console.log(val);
                //$.each(val,function(err,data){
                  for(let i=1;i<=val;i++){
                 meta.viewpurchase(i).then(function(result){
                  $("#product_list").append('<tr><td>' +result[0]+'</td><td>'+ result[1] + '</td><td>' + result[2] +'</td><td>'+ result[3]+'</td><td>'+result[4]+'</td></tr>');
                })
              }
                //})
               
             });
                   
          
            
        },
           
        Vieworder :function(){
              var self = this;
              var meta;
             // var a =parseInt(document.getElementById("orid").value);
              $("#order_list").html('')
              inventory.deployed().then(function(instance){
                meta = instance;
                return meta.getOrderCount();
              }).then(function(val) {
                for(let i=1;i<=val;i++){
                  meta.vieworder(i).then(function(result){
                    $("#order_list").append('<tr><td>' +result[0]+'</td><td>'+ result[1] + '</td><td>' + result[2] +'</td><td>'+ result[3]+'</td><td>'+result[4]+'</td><td>'+result[5]+'</td><td>'+result[6]+'</td></tr>');
                 })
                }
              }).catch(function(e) {
                 console.log(e);
                 //self.setStatus("Error sending coin; see log.");
               });
              },
              ViewRegProduct :function(){
                var self = this;
                var meta;
                $("#reg_list").html('')
                inventory.deployed().then(function(instance){
                  meta = instance;
                    return meta.getProductsCount();
                  }).then(function(val) {
                    console.log(val);
                    //$.each(val,function(err,data){
                      for(let i=1;i<=val;i++){
                     meta.viewproduct(i).then(function(result){
                      $("#reg_list").append('<tr><td>' +result[0]+'</td><td>'+ result[1] + '</td><td>' + result[2] +'</td></tr>');
                    })
                  }
                    //})
                   
                 });
                },
          
          
       },

       
  
   window.addEventListener('load', function() {
  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (typeof web3 !== 'undefined') {
    console.warn("Using web3 detected from external source. If you find that your accounts don't appear or you have 0 MetaCoin, ensure you've configured that source properly. If using MetaMask, see the following link. Feel free to delete this warning. :) http://truffleframework.com/tutorials/truffle-and-metamask")
    // Use Mist/MetaMask's provider
    window.web3 = new Web3(web3.currentProvider);
  } else {
    console.warn("No web3 detected. Falling back to http://127.0.0.1:8080. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask");
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    window.web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8080"));
  }

  App.start();
});