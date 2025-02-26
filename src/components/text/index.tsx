import Light from './light.svg';
import Dark from './dark.svg';

export const Text = () => {
  return (
    <div>
      <img
        src={Light}
        alt="letter logo light"
        className="dark:hidden"
        width={134}
      />
      <img
        src={Dark}
        alt="letter logo dark"
        className="hidden dark:block"
        width={134}
      />
    </div>
  );
};
