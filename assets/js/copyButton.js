
  function changeTooltipMessage(element, msg) {
    var tooltipOriginalTitle=element.getAttribute('data-original-title');
    element.setAttribute('data-original-title', msg);
    $(element).tooltip('show');
    element.setAttribute('data-original-title', tooltipOriginalTitle);
  }

  if(ClipboardJS.isSupported()) {
    $(document).ready(function() {
      var copyButton = "<button type='button' class='btn btn-primary btn-copy-ex' type = 'submit' title='Copier dans le presse-papier' aria-label='Copier dans le presse-papier' data-toggle='tooltip' data-placement='left' id='tooltip-left' data-trigger='hover' data-clipboard-copy><i class='far fa-copy'></i></button>";
      
       $(".chroma").wrap("<div class='sourceCode'> </div>");
      
      $("div.sourceCode").addClass("hasCopyButton");
      // Insert copy buttons:
      $(copyButton).prependTo(".hasCopyButton");

      // Initialize tooltips:
      $('.btn-copy-ex').tooltip({container: 'body'});

      // Initialize clipboard:
      var clipboardBtnCopies = new ClipboardJS('[data-clipboard-copy]', {
        text: function(trigger) {
          return trigger.parentNode.textContent;
        }
      });

      clipboardBtnCopies.on('success', function(e) {
        changeTooltipMessage(e.trigger, 'Copié !');
        e.clearSelection();
      });

      clipboardBtnCopies.on('error', function() {
        changeTooltipMessage(e.trigger,'Appuyez sur Ctrl+C ou Command+C pour copier');
      });
    });
  }
  
  // Identifier les <pre> fermant
    $('pre').next("*:not(pre)").prev().addClass('last'); // Dernier <pre> de chaque groupe contigu de <pre>
    $('pre').parent().each(function (){
      $(this).children('pre').last().addClass('last');
    }); // Si <pre> est le dernier enfant de son parent