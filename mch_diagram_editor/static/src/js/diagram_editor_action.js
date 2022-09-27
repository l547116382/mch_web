odoo.define('mch_diagram_editor.diagram_editor_action', function (require) {
    'use strict';
    const core = require('web.core');
    const AbstractAction = require('web.AbstractAction');

    const { ComponentWrapper } = require('web.OwlCompatibility');
    const DiagramEditor = require('mch_diagram_editor.DiagramEditor');

    const DiagramEditorAction = AbstractAction.extend({
        hasControlPanel: true,
        init(parent, action, options={}) {
            this._super(...arguments);
            this.diagramEditorWrapper = undefined;
            this.action = action;
            this.props = {
                ui: action.ui,
                data: action.data,
                title: action.title
            };

            this.on('diagram_save', this, async (ev) => {
                await this._rpc({
                    model: this.action.resModel,
                    method: 'write',
                    args: [
                        [this.action.resId],
                        {[this.action.fieldName]: ev.data.xml}
                    ]
                });
                this.diagramEditorWrapper.componentRef.comp.done(ev.data.exit);
            });
            this.on('diagram_exit', this, ev => {
                this.trigger_up('breadcrumb_clicked', {
                    controllerID: this.controlPanelProps.breadcrumbs.at(-1).controllerID
                });
            });
        },
        async start() {
            await this._super(...arguments);
            this.$el.find('.o_cp_bottom').hide();
            this.diagramEditorWrapper = new ComponentWrapper(this, DiagramEditor, this.props);
            return this.diagramEditorWrapper.mount(this.el.querySelector('.o_content'));
        }
    });

    core.action_registry.add('diagram_editor_action', DiagramEditorAction);
    return DiagramEditorAction;
});