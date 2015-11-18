### Navigation and smooth scrolling

actions:
  ng-click или on.click
    - код обрабатывается до произведения смены state

  state.go
    - происходит автоматически как следствие нажатия ссылки ui-sref или ng-href
    - не происходит само при скроллинге
    -

Возможное решение
  сначала change State, затем анимация

Проблема
  - при нажатии на menu item, анимация отменяется в связи с присутствием класса ps-velocity-animating,
    но, в то же время, ничего не препятствуует смене state. В результате экран не на своем месте.
  Решение
    блокировать menu item click event, если производится анимация

Класс ps-velocity-animating
  - позволяет блокировать wheel, пока производится анимация
  -