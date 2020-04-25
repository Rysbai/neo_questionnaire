from sqlalchemy.orm import relationship
from survey.extensions import db


class SurrogatePK(object):
    __table_args__ = {'extend_existing': True}

    id = db.Column(db.Integer, primary_key=True)

    @classmethod
    def get_by_id(cls, record_id):
        if any(
                (isinstance(record_id, (str, bytes)) and record_id.isdigit(),
                 isinstance(record_id, (int, float))),
        ):
            return cls.query.get(int(record_id))


def reference_col(tablename, nullable=False, pk_name='id', **kwargs):
    return db.Column(
        db.ForeignKey('{0}.{1}'.format(tablename, pk_name)),
        nullable=nullable, **kwargs)


Column = db.Column
relationship = relationship
Model = db.Model
