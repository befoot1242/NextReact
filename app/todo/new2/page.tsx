export default function Page() {
  return (
    <main className="outer">
      <div className="inner">
        <div className="todolist">
          <div className="item name">name</div>
          <div className="item detail">detail</div>
          <div className="item check"></div>
        </div>
        <div className="todolist">
          <div className="item name">name</div>
          <div className="item detail">detail</div>
          <div className="item check"></div>
        </div>
        <div className="todolist">
          <div className="item name">name</div>
          <div className="item detail">detail</div>
          <div className="item check"></div>
        </div>
        <div className="todolist">
          <div className="item name">name</div>
          <div className="item detail">detail</div>
          <div className="item check"></div>
        </div>
        <div className="todolist">
          <div className="item name">name</div>
          <div className="item detail">detail</div>
          <div className="item check"></div>
        </div>
        <form>
          <div className="forminput">
            <div className="item name">
              <label htmlFor="name">Name:</label>
              <input type="text" name="name" id="name" />
            </div>
            <div className="item name">
              <label htmlFor="detail">detail:</label>
              <input type="text" name="detail" id="detail" />
            </div>
          </div>
        </form>
      </div>
    </main>
  )
}
