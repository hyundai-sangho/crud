var Userdb = require('../model/model')
// const { route } = require('../routes/router')

// 새 사용자를 만들고 저장하십시오
exports.create = (req, res) => {
  // 요청을 확인하십시오
  if (!req.body) {
    res.status(400).send({ message: '콘텐츠는 비어 있으면 안 된다.' })
    return
  }

  // 새로운 사용자
  const user = new Userdb({
    name: req.body.name,
    email: req.body.email,
    gender: req.body.gender,
    status: req.body.status,
  })

  // 데이터베이스에 사용자를 저장합니다
  user
    .save(user)
    .then((data) => {
      // res.send(data)
      res.redirect('/add-user')
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || '작동 중 일부 오류가 발생했습니다.',
      })
    })
}

// 모든 사용자 검색 / 리턴 / 단일 사용자를 검색하고 반환합니다.
exports.find = (req, res) => {
  if (req.query.id) {
    const id = req.query.id

    Userdb.findById(id)
      .then((data) => {
        if (!data) {
          res.status(404).send({ message: 'Not found ' })
        } else {
          res.send(data)
        }
      })
      .catch((err) => {
        res
          .status(500)
          .send({ message: 'ID가 있는 사용자를 검색하는 중 오류가 발생했습니다 ' + id })
      })
  } else {
    Userdb.find()
      .then((user) => {
        res.send(user)
      })
      .catch((err) => {
        res
          .status(500)
          .send({ message: err.message || '사용자 정보를 검색하는 중 오류가 발생했습니다' })
      })
  }
}

// 사용자 ID별로 새 식별 된 사용자를 업데이트합니다
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({ message: '업데이트 할 데이터는 비어 있으면 안 됩니다.' })
  }

  const id = req.params.id

  Userdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: `사용자 ${id}가 없어서 업데이트 할 수 없습니다.` })
      } else {
        res.send(data)
      }
    })
    .catch((err) => {
      res.status(500).send({ message: '사용자 정보 업데이트 오류' })
    })
}

// 요청에 지정된 사용자 ID가있는 사용자 삭제
exports.delete = (req, res) => {
  const id = req.params.id

  Userdb.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: `${id}로 삭제할 수 없습니다.어쩌면 ID가 잘못되었습니다` })
      } else {
        res.send({ message: '사용자가 성공적으로 삭제되었습니다!' })
      }
    })
    .catch((err) => {
      res.status(500).send({ message: 'ID로 사용자를 삭제할 수 없습니다' + id })
    })
}
