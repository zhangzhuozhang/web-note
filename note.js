var np = {};                

  np.config = {
    'appContainer': '.notepad-app'
  };

  np.bShowStatusBar = false;   
  np.bLineWrap = false;

var $editor = (function () {
np.menuData = [
  { 
    title: '文件(F)',
    menuItems: [
      {
        title: '新建(N)',
        shortcut: 'Ctrl+N',
        enabled: true,
        handler: function() { console.log('新建(N) menu clicked!'); }
      },
      {
        title: '打开(O)...',
        shortcut: 'Ctrl+O',
        enabled: true,
        handler: function() { console.log('打开(O) menu clicked!'); }
      },
      {
        title: '保存(S)',
        shortcut: 'Ctrl+S',
        enabled: true,
        handler: function() { console.log('保存(S) menu clicked!'); }
      },
      {
        title: '另存为(A)...',
        shortcut: '',
        enabled: true,
        handler: function() { console.log('另存为(A) menu clicked!'); }
      },
      {
        title: 'hr',
        shortcut: '',
        enabled: true,
        handler: null
      },
      {
        title: '页面设置(U)...',
        shortcut: '',
        enabled: true,
        handler: function() { console.log('页面设置(U) menu clicked!'); }
      },
      {
        title: '打印(P)...',
        shortcut: 'Ctrl+P',
        enabled: true,
        handler: function() { console.log('打印(P) menu clicked!'); }
      },
      {
        title: 'hr',
        shortcut: '',
        enabled: true,
        handler: null
      },
      {
        title: '退出(X)',
        shortcut: '',
        enabled: true,
        handler: function() { console.log('退出(X) menu clicked!'); }
      }
    ],
    width: '202px',
    left: '0px'
  },
  { 
    title: '编辑(E)',
    menuItems: [
      {
        title: '撤销(U)',
        shortcut: 'Ctrl+Z',
        enabled: false,
        handler: function() { console.log('撤销(U) menu clicked!'); }
      },
      {
        title: 'hr',
        shortcut: '',
        enabled: true,
        handler: null
      },
      {
        title: '剪切(T)',
        shortcut: 'Ctrl+X',
        enabled: true,
        handler: function() { console.log('剪切(X) menu clicked!'); }
      },
      {
        title: '复制(C)',
        shortcut: 'Ctrl+C',
        enabled: false,
        handler: function() { console.log('复制(C) menu clicked!'); }
      },
      {
        title: '粘贴(P)',
        shortcut: 'Ctrl+V',
        enabled: false,
        handler: function() { console.log('粘贴(P) menu clicked!'); }
      },
      {
        title: '删除(L)',
        shortcut: 'Del',
        enabled: false,
        handler: function() { console.log('删除(L) menu clicked!'); }
      },
      {
        title: 'hr',
        shortcut: '',
        enabled: true,
        handler: null
      },
      {
        title: '使用 Bing 搜索...',
        shortcut: 'Ctrl+E',
        enabled: true,
        handler: function() { console.log('使用 Bing 搜索 menu clicked!'); }
      },
      {
        title: '查找(F)...',
        shortcut: 'Ctrl+F',
        enabled: false,
        handler: function() { console.log('查找(F) menu clicked!'); }
      },
      {
        title: '查找下一个(N)',
        shortcut: 'F3',
        enabled: false,
        handler: function() { console.log('查找下一个(N) menu clicked!'); }
      },
      {
        title: '替换(R)...',
        shortcut: 'Ctrl+H',
        enabled: true,
        handler: function() { console.log('替换(R) menu clicked!'); }
      },
      {
        title: '转到(G)...',
        shortcut: 'Ctrl+G',
        enabled: true,
        handler: function() { console.log('转到(G) menu clicked!'); }
      },
      {
        title: 'hr',
        shortcut: '',
        enabled: true,
        handler: null
      },
      {
        title: '全选(A)',
        shortcut: 'Ctrl+A',
        enabled: true,
        handler: function() { console.log('全选(A) menu clicked!'); }
      },
      {
        title: '时间/日期(D)',
        shortcut: 'F5',
        enabled: true,
        handler: function() { console.log('时间/日期(D) menu clicked!'); }
      },
    ],
    width: '218px',
    left: '52px'
  },
  { 
    title: '格式(O)',
    menuItems: [
      {
        title: '自动换行(W)',
        shortcut: '',
        enabled: true,
        handler: function() { console.log('自动换行(W) menu clicked!'); }
      },
      {
        title: '字体(F)...',
        shortcut: '',
        enabled: true,
        handler: function() { console.log('字体(F) menu clicked!'); }
      }
    ],
    width: '156px',
    left: '106px'
  },
  { 
    title: '查看(V)',
    menuItems: [
      {
        title: '状态栏(S)',
        shortcut: '',
        enabled: true,
        handler: function() {
          np.bShowStatusBar = !np.bShowStatusBar;
          $statusBar.display(np.bShowStatusBar);
          $menubar.checked(3, 0, np.bShowStatusBar);
          $editor.resize(np.bShowStatusBar);
        }
      }
    ],
    width: '138px',
    left: '162px'
  },
  { 
    title: '帮助(H)',
    menuItems: [
      {
        title: '查看帮助(H)',
        shortcut: '',
        enabled: true,
        handler: function() { console.log('查看帮助(H) menu clicked!'); }
      },
      {
        title: '关于记事本(A)',
        shortcut: '',
        enabled: true,
        handler: function() { console.log('关于记事本'); }
      },
    ],
    width: '166px',
    left: '216px'
  }
];

  var $DOM = $(''
    + '<div class="notepad-editor">'
    + '<textarea spellcheck="false"></textarea>'
    + '</div>');

  var $textArea = $DOM.find('textarea');

  function resize(isBig) {
    if (isBig) {
      $DOM.css({ bottom: '21px' });
    } else {
      $DOM.css({ bottom: '0' });
    }
  }

  function show() {
    $('body').append($DOM);
    $textArea.trigger('focus');
  }

  return { show: show, resize: resize };
}());

var $menubar = (function() {
  var $bar = $('<div class="notepad-menubar"></div>');

  var menuData,           
      menus = [];        

  
  var active = -1;

  function createMenuTitle() {
    var $titles = $('<ul class="menu-title"></ul>');

    for(var i=0; i<menuData.length; i++) {
      var $title = $('<li class="title"></li>');

      $title.html(menuData[i].title);
      $title.attr('data-id', i);
      $titles.append($title);

      $title.click(function() {
        var i = Number(this.dataset.id);

        if(active === -1) {
          menus[i].css({ display: 'inline-block' });
          active = i;
        } else if(active !== i) {
          menus[active].css({ display: 'none' });
          menus[i].css({ display: 'inline-block' });
          active = i;
        } else {
          menus[active].css({ display: 'none' });
          active = -1;
        }
      });

      $title.hover(function() {
        if(active !== -1) {
          var i = Number(this.dataset.id);

          menus[active].css({ display: 'none' });
          menus[i].css({ display: 'inline-block' });
          active = i;
        }
      });
    }

    $bar.append($titles);
  }

  function createMenus() {
    for(var i=0; i<menuData.length; i++) {
      var $menus = $('<ul class="menus"></ul>'),
          items = menuData[i].menuItems;

      for(var j=0; j<items.length; j++) {
        if(items[j].title === 'hr') {
          var $hr = $('<li class="menu-hr"></li>');
          $menus.append($hr);
          continue;
        }

        var $menu = $('<li class="menu-item"></li>');

        $menu.html(items[j].title);
        $menu.attr('data-x', i);
        $menu.attr('data-y', j);

        if(items[j].shortcut !== '') {
          var $shorcut = $('<span class="shortcut"></span>');

          $shorcut.html(items[j].shortcut);
          $menu.append($shorcut);
        }

        if(!items[j].enabled) $menu.addClass('disabled');

        $menus.append($menu);

        $menu.click(function() {
          if($(this).hasClass('disabled')) return;

          var i = this.dataset.x, j = this.dataset.y;

          menuData[i].menuItems[j].handler();
          menus[i].css({display: 'none'});
          active = -1;
        });
      }

      $menus.css({
        width: menuData[i].width,
        left: menuData[i].left,
        display: 'none'
      });

      $bar.append($menus);
      menus.push($menus);
    }
  }

  
  function checked(row, col, isChecked) {
    var menuItem = menus[row].find('.menu-item')[col];

    if(isChecked) {
      $(menuItem).prepend($('<span class="checked">✓</span>')[0]);
    } else {
      $(menuItem).find('.checked').remove();
    }
  }

  
  function enabled(row, col, isEnabled) {
    var menuItem = menus[row].find('.menu-item')[col];

    if(isEnabled) {
      $(menuItem).removeClass('disabled');
    } else {
      $(menuItem).addClass('disabled');
    }
  }

  function init() {
    createMenuTitle();
    createMenus();

    $('body').append($bar);
  }

  function show(data) {
    menuData = data;
    init();
  }

  return {
    show: show,
    checked: checked,
    enabled: enabled
  };
}());


/* exported $statusBar */
var $statusBar = (function() {
  var $stBar = $(''
   + '<div class="notepad-statusbar">'
    + '<div class="left-panel"></div>'
    + '<div class="right-panel">'
      + '<p class="row-col"></p>'
    + '</div>'
   + '</div>');

  var $rowCol = $stBar.find('.row-col'),
      strRowCol = '第&nbsp;x&nbsp;行，第&nbsp;y&nbsp;列',
      cfg = {row: 1, col: 1};

  function display(isVisable) {
    if(isVisable) {
      $stBar.css('display', 'block');
    } else {
      $stBar.css('display', 'none');
    }
  }

  function setRowCol(r, c) {
    $rowCol.html(strRowCol.replace('x', r).replace('y', c));
  }

  function init(conf) {
    $.extend(cfg, conf);
    setRowCol(cfg.row, cfg.col);
    $('body').append($stBar);
  }

  return {
    init: init, 
    setRowCol: setRowCol,
    display: display
  };
}());



/* exported $dlgFont */
/* global comList: true */
var $dlgFont = (function() {
  var $dlg = $(''
      + '<div class="notepad-dlg-mask notepad-dlg-font">'
        + '<div class="dialogbox notepad-dlgbox">'
          + '<div class="notepad-dlg-titlebar">'
            + '<p class="title">字体</p>'
            + '<span class="close-btn">✖</span>'
          + '</div>'
          + '<div class="main notepad-dlg-main">'
            + '<div class="font-family"><p>字体(F):</p></div>'
            + '<div class="font-style"><p>字形(Y):</p></div>'
            + '<div class="font-size"><p>大小(S):</p></div>'
            + '<fieldset class="sample">'
              + '<legend>示例</legend>'
              + '<p>AaBbYyZz</p>'
            + '</fieldset>'
            + '<div class="script">'
              + '<label>'
                + '脚本(R):<br>'
                + '<select>'
                  + '<option value="西欧语言">西欧语言</option>'
                  + '<option value="中文 GB2312">中文 GB2312</option>'
                + '</select>'
              + '</label>'
            + '</div>'
            + '<input class="btn-ok btn" type="button" value="确定">'
            + '<input class="btn-cancel btn" type="button" value="取消">'
          + '</div>'
        + '</div>'
      + '</div>');

  var $btnOk = $dlg.find('.btn-ok'),
      $btnClose = $dlg.find('.close-btn'),
      $btnCancel = $dlg.find('.btn-cancel'),
      $titleBar = $dlg.find('.notepad-dlg-titlebar');

  function init() {
    var fonts = ['Agency FB', 'Algerian', 'Arial', 'Arial Rounded MT', 'Axure Handwriting', 'Bahnschrift', 'Baskerville Old Face', 'Bauhaus 93', 'Bell MT', 'Berlin Sans FB', 'Bernard MT', 'BlackAdder ITC'],
        styles = ['常规', '斜体', '粗体', '粗偏斜体'],
        sizes = ['8', '9', '10', '11', '12', '14', '16', '18', '20', '22', '24', '26', '28', '36', '48', '72'];

    var l1 = new comList();
    l1.show({
      container: '.notepad-dlg-font .font-family',
      width: '176px',
      list: fonts,
      isFont: true,
      selectHandler: function(e) { console.log(fonts[e]); }
    });

    var l2 = new comList();
    l2.show({
      container: '.notepad-dlg-font .font-style',
      select: 3,
      width: '132px',
      list: styles,
      isFontStyle: true,
      selectHandler: function(e) { console.log(styles[e]); }
    });

    var l3 = new comList();
    l3.show({
      container: '.notepad-dlg-font .font-size',
      width: '64px',
      list: sizes,
      selectHandler: function(e) { console.log(sizes[e]); }
    });
  }

  function destory() { $dlg.remove(); }
  function show() {
    $('body').append($dlg);
    init();
    $dlg.find('.dialogbox').draggable({handle: $titleBar});

    $btnClose.click(destory);
    $btnCancel.click(destory);
    $btnOk.click(destory);
  }

  return {show: show};
}());
