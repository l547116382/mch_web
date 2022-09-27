import logging

from odoo import models, fields, api, _
from odoo.exceptions import UserError, ValidationError

_logger = logging.getLogger(__name__)


class DiagramEditorDemo(models.Model):
    """
    """
    _name = 'diagram.editor.demo'
    _description = 'Diagram Editor Demo'

    name = fields.Char(string='Diagram Name', required=True)
    diagram = fields.Text(string='Diagram')