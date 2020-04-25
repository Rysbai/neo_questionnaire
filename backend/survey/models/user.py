from survey.extensions import db
from survey.models.utils import Model, SurrogatePK


class User(Model, SurrogatePK):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
