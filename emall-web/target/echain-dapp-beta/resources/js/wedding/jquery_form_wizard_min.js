
(function (n) {
	n.widget("ui.formwizard", {_init:function () {
		var t = this, i = this.options.formOptions.success, r = this.options.formOptions.complete, u = this.options.formOptions.beforeSend, f = this.options.formOptions.beforeSubmit, e = this.options.formOptions.beforeSerialize;
		return this.options.formOptions = n.extend(this.options.formOptions, {success:function (n, r, u) {
			i && i(n, r, u), (t.options.formOptions && t.options.formOptions.resetForm || !t.options.formOptions) && t._reset();
		}, complete:function (n, i) {
			r && r(n, i), t._enableNavigation();
		}, beforeSubmit:function (n, i, r) {
			if (f) {
				var u = f(n, i, r);
				return u || t._enableNavigation(), u;
			}
		}, beforeSend:function (n) {
			if (u) {
				var i = u(n);
				return i || t._enableNavigation(), i;
			}
		}, beforeSerialize:function (n, i) {
			if (e) {
				var r = e(n, i);
				return r || t._enableNavigation(), r;
			}
		}}), this.options.historyEnabled && n.bbq.removeState("_" + n(this.element).attr("id")), this.steps = this.element.find(".step").hide(), this.firstStep = this.steps.eq(0).attr("id"), this.activatedSteps = [], this.isLastStep = !1, this.previousStep = undefined, this.currentStep = this.steps.eq(0).attr("id"), this.nextButton = this.element.find(this.options.next).click(function () {
			return t._next();
		}), this.nextButtonInitinalValue = this.nextButton.val(), this.nextButton.val(this.options.textNext), this.backButton = this.element.find(this.options.back).click(function () {
			return t._back(), !1;
		}), this.backButtonInitinalValue = this.backButton.val(), this.backButton.val(this.options.textBack), this.options.validationEnabled && jQuery().validate == undefined ? (this.options.validationEnabled = !1, window.console !== undefined && console.log("%s", "validationEnabled option set, but the validation plugin is not included")) : this.options.validationEnabled && this.element.validate(this.options.validationOptions), this.options.formPluginEnabled && jQuery().ajaxSubmit == undefined && (this.options.formPluginEnabled = !1, window.console !== undefined && console.log("%s", "formPluginEnabled option set but the form plugin is not included")), this.options.disableInputFields == 1 && n(this.steps).find(":input:not('.wizard-ignore')").attr("disabled", "disabled"), this.options.historyEnabled && n(window).bind("hashchange", undefined, function (i) {
			var r = i.getState("_" + n(t.element).attr("id")) || t.firstStep;
			if (r !== t.currentStep) {
				if (t.options.validationEnabled && r === t._navigate(t.currentStep) && !t.element.valid()) {
					return t._updateHistory(t.currentStep), t.element.validate().focusInvalid(), !1;
				}
				r !== t.currentStep && t._show(r);
			}
		}), this.element.addClass("ui-formwizard"), this.element.find(":input").addClass("ui-wizard-content"), this.steps.addClass("ui-formwizard-content"), this.backButton.addClass("ui-formwizard-button ui-wizard-content"), this.nextButton.addClass("ui-formwizard-button ui-wizard-content"), this.options.disableUIStyles || (this.element.addClass("ui-helper-reset ui-widget ui-widget-content ui-helper-reset ui-corner-all"), this.element.find(":input").addClass("ui-helper-reset ui-state-default"), this.steps.addClass("ui-helper-reset ui-corner-all"), this.backButton.addClass("ui-helper-reset ui-state-default"), this.nextButton.addClass("ui-helper-reset ui-state-default")), this._show(undefined), n(this);
	}, _next:function () {
		var t, i;
		if (this.options.validationEnabled && !this.element.valid()) {
			return this.element.validate().focusInvalid(), !1;
		}
		if (this.options.remoteAjax != undefined && (t = this.options.remoteAjax[this.currentStep], i = this, t !== undefined)) {
			var r = t.success, u = t.beforeSend, f = t.complete;
			return t = n.extend({}, t, {success:function (n, t) {
				(r !== undefined && r(n, t) || r == undefined) && i._continueToNextStep();
			}, beforeSend:function (t) {
				i._disableNavigation(), u !== undefined && u(t), n(i.element).trigger("before_remote_ajax", {currentStep:i.currentStep});
			}, complete:function (t, r) {
				f !== undefined && f(t, r), n(i.element).trigger("after_remote_ajax", {currentStep:i.currentStep}), i._enableNavigation();
			}}), this.element.ajaxSubmit(t), !1;
		}
		return this._continueToNextStep();
	}, _back:function () {
		return this.activatedSteps.length > 0 && (this.options.historyEnabled ? this._updateHistory(this.activatedSteps[this.activatedSteps.length - 2]) : this._show(this.activatedSteps[this.activatedSteps.length - 2], !0)), !1;
	}, _continueToNextStep:function () {
		var n, t;
		if (this.isLastStep) {
			for (n = 0; n < this.activatedSteps.length; n++) {
				this.steps.filter("#" + this.activatedSteps[n]).find(":input").not(".wizard-ignore").removeAttr("disabled");
			}
			return this.options.formPluginEnabled ? (this._disableNavigation(), this.element.ajaxSubmit(this.options.formOptions), !1) : !0;
		}
		return (t = this._navigate(this.currentStep), t == this.currentStep) ? !1 : (this.options.historyEnabled ? this._updateHistory(t) : this._show(t, !0), !1);
	}, _updateHistory:function (t) {
		var i = {};
		i["_" + n(this.element).attr("id")] = t, n.bbq.pushState(i);
	}, _disableNavigation:function () {
		this.nextButton.attr("disabled", "disabled"), this.backButton.attr("disabled", "disabled"), this.options.disableUIStyles || (this.nextButton.removeClass("ui-state-active").addClass("ui-state-disabled"), this.backButton.removeClass("ui-state-active").addClass("ui-state-disabled"));
	}, _enableNavigation:function () {
		this.isLastStep ? this.nextButton.val(this.options.textSubmit) : this.nextButton.val(this.options.textNext), n.trim(this.currentStep) !== this.steps.eq(0).attr("id") && (this.backButton.removeAttr("disabled"), this.options.disableUIStyles || this.backButton.removeClass("ui-state-disabled").addClass("ui-state-active")), this.nextButton.removeAttr("disabled"), this.options.disableUIStyles || this.nextButton.removeClass("ui-state-disabled").addClass("ui-state-active");
	}, _animate:function (n, t, i) {
		var f, u, r;
		this._disableNavigation(), f = this.steps.filter("#" + n), u = this.steps.filter("#" + t), f.find(":input").not(".wizard-ignore").attr("disabled", "disabled"), u.find(":input").not(".wizard-ignore").removeAttr("disabled"), r = this, f.animate(r.options.outAnimation, r.options.outDuration, r.options.easing, function () {
			u.animate(r.options.inAnimation, r.options.inDuration, r.options.easing, function () {
				r.options.focusFirstInput && u.find(":input:first").focus(), r._enableNavigation(), i.apply(r);
			});
			return;
		});
	}, _checkIflastStep:function (t) {
		this.isLastStep = !1, (n("#" + t).hasClass(this.options.submitStepClass) || this.steps.filter(":last").attr("id") == t) && (this.isLastStep = !0);
	}, _getLink:function (t) {
		var r = undefined, i = this.steps.filter("#" + t).find(this.options.linkClass);
		return i != undefined && (r = i.filter(":radio,:checkbox").size() > 0 ? i.filter(this.options.linkClass + ":checked").val() : n(i).val()), r;
	}, _navigate:function (n) {
		var t = this._getLink(n);
		return t != undefined ? t != "" && t != null && t != undefined && this.steps.filter("#" + t).attr("id") != undefined ? t : this.currentStep : t == undefined && !this.isLastStep ? this.steps.filter("#" + n).next().attr("id") : void 0;
	}, _show:function (t) {
		var i = !1, r = t !== undefined, u;
		t == undefined || t == "" ? (this.activatedSteps.pop(), t = this.firstStep, this.activatedSteps.push(t)) : n.inArray(t, this.activatedSteps) > -1 ? (i = !0, this.activatedSteps.pop()) : this.activatedSteps.push(t), (this.currentStep !== t || t === this.firstStep) && (this.previousStep = this.currentStep, this._checkIflastStep(t), this.currentStep = t, u = function () {
			r && n(this.element).trigger("step_shown", n.extend({isBackNavigation:i}, this._state()));
		}, r && n(this.element).trigger("before_step_shown", n.extend({isBackNavigation:i}, this._state())), this._animate(this.previousStep, t, u));
	}, _reset:function () {
		this.element.resetForm(), n("label,:input,textarea", this).removeClass("error");
		for (var t = 0; t < this.activatedSteps.length; t++) {
			this.steps.filter("#" + this.activatedSteps[t]).hide().find(":input").attr("disabled", "disabled");
		}
		this.activatedSteps = [], this.previousStep = undefined, this.isLastStep = !1, this.options.historyEnabled ? this._updateHistory(this.firstStep) : this._show(this.firstStep);
	}, _state:function (n) {
		var t = {settings:this.options, activatedSteps:this.activatedSteps, isLastStep:this.isLastStep, isFirstStep:this.currentStep === this.firstStep, previousStep:this.previousStep, currentStep:this.currentStep, backButton:this.backButton, nextButton:this.nextButton, steps:this.steps, firstStep:this.firstStep};
		return n !== undefined ? t[n] : t;
	}, show:function (n) {
		this.options.historyEnabled ? this._updateHistory(n) : this._show(n);
	}, state:function (n) {
		return this._state(n);
	}, reset:function () {
		this._reset();
	}, next:function () {
		this._next();
	}, back:function () {
		this._back();
	}, destroy:function () {
		this.element.find("*").removeAttr("disabled").show(), this.nextButton.unbind("click").val(this.nextButtonInitinalValue).removeClass("ui-state-disabled").addClass("ui-state-active"), this.backButton.unbind("click").val(this.backButtonInitinalValue).removeClass("ui-state-disabled").addClass("ui-state-active"), this.backButtonInitinalValue = undefined, this.nextButtonInitinalValue = undefined, this.activatedSteps = undefined, this.previousStep = undefined, this.currentStep = undefined, this.isLastStep = undefined, this.options = undefined, this.nextButton = undefined, this.backButton = undefined, this.formwizard = undefined, this.element = undefined, this.steps = undefined, this.firstStep = undefined;
	}, update_steps:function () {
		this.steps = this.element.find(".step").addClass("ui-formwizard-content"), this.firstStep = this.steps.eq(0).attr("id"), this.steps.not("#" + this.currentStep).hide().find(":input").addClass("ui-wizard-content").attr("disabled", "disabled"), this._checkIflastStep(this.currentStep), this._enableNavigation(), this.options.disableUIStyles || (this.steps.addClass("ui-helper-reset ui-corner-all"), this.steps.find(":input").addClass("ui-helper-reset ui-state-default"));
	}, options:{historyEnabled:!1, validationEnabled:!1, validationOptions:undefined, formPluginEnabled:!1, linkClass:".link", submitStepClass:"submit_step", back:":reset", next:":submit", textSubmit:"\u63d0\u4ea4", textNext:"\u4e0b\u4e00\u6b65", textBack:"\u540e\u9000", remoteAjax:undefined, inAnimation:{opacity:"show"}, outAnimation:{opacity:"hide"}, inDuration:400, outDuration:400, easing:"swing", focusFirstInput:!1, disableInputFields:!0, formOptions:{reset:!0, success:function () {
		window.console !== undefined && console.log("%s", "form submit successful");
	}, disableUIStyles:!1}}});
})(jQuery);
//@ sourceMappingURL=jquery.form.wizard.min.js.map

