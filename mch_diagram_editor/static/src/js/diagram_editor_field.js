odoo.define('mch_diagram_editor.diagram_editor_field', function (require) {
    'use strict';
    const AbstractField = require('web.AbstractFieldOwl');
    const fieldRegistry = require('web.field_registry_owl');

    const core = require('web.core');
    const _t = core._t;

    class DiagramEditorField extends AbstractField {
        constructor(...args) {
            super(...args);
        }

        startEditing() {
            const filename_value = this.recordData[this.attrs.filename];
            const ui = this.attrs.ui || 'atlas';
            if(!['atlas', 'min'].includes(ui)) {
                throw new Error(_t('The ui optional value is atlas and min.'));
            }

            const action = {
                name: filename_value,
                type: 'ir.actions.client',
                tag: 'diagram_editor_action',
                target: 'fullscreen',
                resModel: this.model,
                resId: this.resId,
                fieldName: this.name,
                data: this.value || undefined,
                title: filename_value,
                ui
            };
            this.trigger('do-action', { action });
        }

        /**
         *
         * @override
        */
        get isSet() {
            return true;
        }
    }

    Object.assign(DiagramEditorField, {
        supportedFieldTypes: ['text'],
        template: 'DiagramEditorField'
    });

    fieldRegistry.add('diagram_editor', DiagramEditorField);
});