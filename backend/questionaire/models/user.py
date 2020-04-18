from questionaire.extensions import db
from questionaire.models.utils import Model, SurrogatePK


class User(Model, SurrogatePK):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
