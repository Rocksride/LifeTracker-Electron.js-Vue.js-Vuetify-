// вспомогательная функция для тестирования действия, которое должно вызывать известные мутации
export const testAction = (action, payload, state, expectedMutations, done) => {
  let count = 0;

  // поддельная функция вызова мутаций
  const commit = (type, payload) => {
    const mutation = expectedMutations[count];

    try {
      expect(mutation.type).to.equal(type);
      if (payload) {
        expect(mutation.payload).to.deep.equal(payload);
      }
    } catch (error) {
      done(error);
    }

    count++;
    if (count >= expectedMutations.length) {
      done();
    }
  };

  // вызываем действие с поддельным хранилищем и аргументами
  action({ commit, state }, payload);

  // проверяем, были ли инициированы мутации
  if (expectedMutations.length === 0) {
    expect(count).to.equal(0);
    done();
  }
};
