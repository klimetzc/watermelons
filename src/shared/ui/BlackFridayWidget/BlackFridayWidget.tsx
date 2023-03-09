import React from 'react';
import './BlackFridayWidget.scss';

const BlackFridayWidget = () => (
  <div className="black-friday-widget">
    <div className="black-friday-widget__slogan">
      BLACK
      <br /> <span className="black-friday-widget__friday">FRIDAY</span>
    </div>
    <div className="black-friday-widget__description">
      При покупке на сумму больше 200$ неоновый арбузик в подарок. Закупайся в
      Арбузиках и каждый день будет как Чёрная пятница!
    </div>
    <div className="black-friday-widget__sale">SALE</div>
    <div className="black-friday-widget__sale-icon">10</div>
  </div>
);

export default BlackFridayWidget;
