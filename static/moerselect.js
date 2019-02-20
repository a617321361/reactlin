
  function divSelect(obj){
     $('#'+obj.id).append('<div style="display:none;background:#0e122e;width:100%;border:1px solid #989393;z-index:9;box-sizing:border-box;position:absolute;top:'+$('#'+obj.id).height()+'px;left:0px;font-size:12px;">'
      +'<p style="overflow:hidden;margin:0px;padding:3px;height:26px;border-bottom:1px solid #989393;">'
        +'<button style="float:left;width:38px;height:20px;font-size:12px;margin:0px;" >全选</button>'
        +'<button style="float:left;width:38px;height:20px;font-size:12px;margin:0 0 0 5px;" >清空</button>'
        +'<button style="float:right;width:38px;height:20px;font-size:12px;margin:0 5px 0 0;" id="YesBtn">确定</button>'
      +'<p>'
      +'<div class="Clselectbox" style="width:100%;max-height:200px;overflow:auto; padding:0 0 5px 0 ;"></div>'
        +'</div><span style="display:block;width:100%;height:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap"></span>');

      
      $('#'+obj.id).children('span').on('click',function(){
        $('#'+obj.id).children('div').css('display','block')
        event.stopPropagation();//阻止事件冒泡
     });
      $('#'+obj.id).on('click',function(){
       
        event.stopPropagation();//阻止事件冒泡
     });
    $('#'+obj.id).find('button').eq(0).on('click',function(){//全选
      $('#'+obj.id).find('.CLselectItem').css('backgroundColor','#66b6fd');
      $('#'+obj.id).find('.CLselectItem').css('color','#000');
        $('#'+obj.id).find('.CLselectItem').find("input").prop('checked',true)
     });
    $('#'+obj.id).find('button').eq(1).on('click',function(){//清空
      $('#'+obj.id).find('.CLselectItem').css('backgroundColor','#0e122e');
      $('#'+obj.id).find('.CLselectItem').css('color','#ccc');
        $('#'+obj.id).find('.CLselectItem').find("input").prop('checked',false)
     });
    $('#'+obj.id).find('button').eq(2).on('click',function(){//确定
      var str='';
      var idstr='';
      $('#'+obj.id).find('.CLselectItem').each(function(){
        if($(this).find('input').prop('checked')){
          idstr+=$(this).data('wid');
          idstr+=',';
          str+=$(this).text();
          str+=','
        }
      })

       idstr=idstr.substring(0,idstr.length-1);
       str=str.substring(0,str.length-1)
       console.log(idstr)
       $('#'+obj.id).find('span').text(str);
       $('#'+obj.id).find('span').data('wid',idstr);
       $('#'+obj.id).find('span').attr('title',str);
       $('#'+obj.id).children('div').css('display','none')
      
     });

   };
   function mapSelect(obj){
    $('#'+obj.id).find('.Clselectbox').empty();
    if(obj.arr&&obj.arr.length>0){
      obj.arr.map(function(value,key){
        $('#'+obj.id).find('.Clselectbox').append('<div class="CLselectItem" data-wid='+obj.arr[key][obj.showWid]+'  style="width:100%;height:30px;line-height:30px;color:#ccc; padding:0 5px;box-sizing:border-box;" >'
         +value[obj.showZD]
         +'<input type="checkbox" style="float:left;margin-top:9px" /></div>')
      })
    }else{
      $('#'+obj.id).find('.Clselectbox').append('<p style="text-align:center">暂无数据！</p>')
    }

    $('#'+obj.id).find('.CLselectItem').on('click',function(){
      if($(this).find("input").prop('checked')){
        $(this).css('backgroundColor','#0e122e');
        $(this).css('color','#ccc');
        $(this).find("input").prop('checked',false)
      }else{
        $(this).css('backgroundColor','#66b6fd');
        $(this).css('color','#000');
        $(this).find("input").prop('checked',true)
        
      }
      console.log($(this).find("input").val())
      //event.stopPropagation();//阻止事件冒泡
      
    });

    $('#'+obj.id).find('.CLselectItem>input').on('change',function(){
      if($(this).prop('checked')){
        $(this).parent().css('backgroundColor','#0e122e');
        $(this).parent().css('color','#ccc');
        $(this).prop('checked',false)
      }else{
        $(this).parent().css('backgroundColor','#66b6fd');
        $(this).parent().css('color','#000');
        $(this).prop('checked',true)
        
      }
      // console.log($(this).find("input").val())
      //event.stopPropagation();//阻止事件冒泡
      
    });




   };


   



      function beginselect(obj){
        divSelect(obj);
        mapSelect(obj);
         $('body').on('click',function(){
          console.log(3333)
        $('#'+obj.id).children('div').css('display','none')
       });
      }


