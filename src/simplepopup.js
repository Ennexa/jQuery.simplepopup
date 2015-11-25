/**
 * jQuery.simplepopup - Modal popup with auto ajaxification of links and forms
 * Copyright (c) Ennexa Technologies (P) Ltd | http://www.ennexa.com/
 * Dual licensed under MIT and GPL.
 * Date: 19/05/2012
 * @author Joyce Babu
 * @version 1.0.0
 *
 */

(function ($) {
	var SimplePopup = function (elem, options) {
		var target, popup = this;
		this.options = options;
		this.__handle = elem;
		target = options.popup || $('<div class="modal '+options.extraClass+'"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button><h3 class="modal-title"/></div><div class="modal-body"/><div class="modal-footer"/></div></div></div>').appendTo('body');
		this.__target = $(target);
		this.__title = $('.modal-title', target);
		this.__body = elem.addClass('modal-body').replaceAll($('.modal-body', target));
		this.__footer = $('.modal-footer', target);

		this.load = $.proxy(function (url, fn) {
			this.__body.load(url, function () {
				popup.__setContent();
				if (fn) fn.call(popup);
			});
		}, popup);

		this.modal = $.proxy(function (option) {
			this.__target.modal(option);
		}, popup);

		this.__setContent = $.proxy(function (content) {
			var c = $(content || this.__handle), h1 = c.find('h1'), title = h1.html() || this.options.title || '&nbsp;', actions = c.find('.form-actions');
			this.options('title', title);
			if (options.footerAction) {
				var frm = actions.closest('form');
				this.__footer.empty();
				actions.removeClass('form-actions').find('[type="submit"],[type="reset"]').click(function(){
					if (frm.length) frm[this.type]();
				}).appendTo(this.__footer);
			}
			h1.remove();
			if (content) {
				this.__body.html(c);
			}
			this.__body.trigger('simplepopupload', {element: this.__body, modal: target, simplepopup: this});
		}, popup);

		this.__target.on('click', 'a[href]:not([data-skip])', function (e) {
			var href = $(this).attr('href');
			if (href[0] !== '#') {
				$.get(this.href, popup.__setContent);
				e.preventDefault();
			}
		}).on('submit', 'form:not([data-skip])', function (e) {
			var frm = e.target;
			$.post(frm.action, $(frm).serialize(), popup.__setContent);
			e.preventDefault();
		});
		
		this.options = function (option, value) {
			if ($.isPlainObject(option)) {
				for (var i in option) {
					this.options(i, option[i]);
				}
				return;
			}
			if (option === 'title') this.__title.html(value);
			else if (option === 'show') {
				this.modal(value ? 'show' : 'hide');
			} else if (option === 'width') {
				var dialog = this.__body.closest('.modal-dialog').removeClass('modal-lg modal-sm').css('width', '');
				if (isNaN(value)) {
					dialog.addClass(value);
				} else {
					dialog.css('width', value);
				}
			}
			if (option === 'keyboard') {
				this.__title.prev('.close').css('display', value ? 'block' : 'none');
			}
			this.options[option] = value;
		}

		this.options(options);
		this.__setContent();
		this.modal(options);

	};
	$.fn.simplepopup = function (options) {
		var $this = $(this).eq(0),
		simplepopup = $this.data('$simplepopup'),
		opt = $.extend($.fn.simplepopup.defaults, $this.data(), typeof options == 'object' && options);
		if (!simplepopup) $this.data('$simplepopup', (simplepopup = new SimplePopup($this, opt)));
		if (simplepopup[options]) simplepopup[options].apply(simplepopup, Array.prototype.slice.call(arguments, 1));
		return this;
	};
	$.fn.simplepopup.defaults = {
		title : '',
		show : true,
		backdrop : true,
		keyboard : true,
		footerAction : true,
		extraClass : 'fade',
		width: null
	};
})(jQuery);

(function ($) {
	$(document).on('simplepopupload', function (e, data) {
		var $t = $(e.target);
		$t.find('.msgButton').find('.btn').each(function(){
			var $t = $(this);
			if ($t.text() === 'Back') $t.text('Close').attr({'data-dismiss': 'modal', 'data-skip': 'skip'});
		}).appendTo(data.simplepopup.__footer).end().end().remove();
	});
})(jQuery);