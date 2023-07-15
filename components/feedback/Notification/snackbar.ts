import { getIsDark } from '@/styles/globals';
import { Themes } from '@/styles/Themes';
import { settings } from '@/styles/Settings';

export type SnackbarSettings = {
  text: string;
  textColor?: string;
  width: string;
  showAction?: boolean;
  actionText: string;
  actionTextAria: string;
  alertScreenReader?: boolean;
  actionTextColor: string;
  showSecondButton?: boolean;
  secondButtonText: string;
  secondButtonAria: string;
  secondButtonTextColor: string;
  backgroundColor: string;
  pos:
    | 'bottom-center'
    | 'bottom-left'
    | 'bottom-right'
    | 'top-center'
    | 'top-left'
    | 'top-right';
  duration?: number;
  customClass?: string;
  color?: 'danger' | 'warning' | 'default';
  // eslint-disable-next-line no-unused-vars
  onActionClick: (element: any) => void;
  // eslint-disable-next-line no-unused-vars
  onSecondButtonClick: (element: HTMLDivElement) => void;
  onClose?: () => void;
};
const defaults: SnackbarSettings = {
  text: 'Default Text',
  textColor: '#FFFFFF',
  width: 'auto',
  showAction: true,
  actionText: 'Dismiss',
  actionTextAria: 'Dismiss, Description for Screen Readers',
  alertScreenReader: false,
  actionTextColor: '#4CAF50',
  showSecondButton: false,
  secondButtonText: '',
  secondButtonAria: 'Description for Screen Readers',
  secondButtonTextColor: '#4CAF50',
  backgroundColor: '#323232',
  pos: 'bottom-center',
  duration: 5000,
  customClass: '',
  color: 'danger',
  onActionClick: (element: any) => {
    element.style.opacity = 0;
  },
  onSecondButtonClick: () => {},
  onClose: () => {},
};

export interface ISnackbar {
  current?: any;
  snackbar?: HTMLDivElement;
  // eslint-disable-next-line no-unused-vars
  show: (options: SnackbarSettings) => void;
  close: () => void;
}
const snackbar = () => {
  let Snackbar: ISnackbar = {
    current: null,
    show: () => {},
    close: () => {},
  };

  Snackbar.show = ($options: SnackbarSettings) => {
    let options = { ...defaults, ...$options };

    if (Snackbar.current) {
      Snackbar.current.style.opacity = 0;
      setTimeout(
        function () {
          let $parent = Snackbar.current.parentElement;
          if ($parent)
            // possible null if too many/fast Snackbars
            $parent.removeChild(Snackbar.current);
        }.bind(Snackbar.current),
        500
      );
    }
    const theme = getIsDark() ? 'dark' : 'light';
    Snackbar.snackbar = document.createElement('div');
    Snackbar.snackbar.className = 'snackbar-container ' + options.customClass;
    Snackbar.snackbar.style.width = options.width;
    let $p: HTMLParagraphElement = document.createElement('p');
    $p.style.margin = '0';
    $p.style.padding = '0';
    $p.style.color = Themes[theme].font.regular;
    $p.style.fontSize = '16px';
    $p.style.fontWeight = '400';
    $p.style.lineHeight = '1em';
    $p.innerHTML = options.text;
    Snackbar.snackbar.appendChild($p);
    Snackbar.snackbar.style.background = Themes[theme].background;
    Snackbar.snackbar.style.borderWidth = '1px';
    Snackbar.snackbar.style.borderStyle = 'solid';
    Snackbar.snackbar.style.borderColor = Themes[theme].components.border;
    Snackbar.snackbar.style.borderRadius = settings.borderRadius_md;
    if (options.color === 'danger') {
      Snackbar.snackbar.style.borderColor = Themes[theme].components.danger;
      $p.style.color = Themes[theme].font.danger;
    }

    if (options.showSecondButton) {
      let secondButton = document.createElement('button');
      secondButton.className = 'action';
      secondButton.innerHTML = options.secondButtonText;
      secondButton.setAttribute('aria-label', options.secondButtonAria);
      secondButton.style.color = options.secondButtonTextColor;
      secondButton.addEventListener('click', function () {
        if (Snackbar.snackbar) {
          options.onSecondButtonClick(Snackbar.snackbar);
        }
      });
      Snackbar.snackbar.appendChild(secondButton);
    }

    if (options.showAction) {
      let actionButton = document.createElement('button');
      actionButton.className = 'action';
      actionButton.innerHTML = options.actionText;
      actionButton.setAttribute('aria-label', options.actionTextAria);
      actionButton.style.color = options.actionTextColor;
      actionButton.addEventListener('click', function () {
        options.onActionClick(Snackbar.snackbar);
      });
      Snackbar.snackbar.appendChild(actionButton);
    }

    if (options.duration) {
      setTimeout(
        function () {
          // @ts-ignore
          if (Snackbar.current === this) {
            Snackbar.current.style.opacity = 0;
            Snackbar.current.style.top = '-100px';
            Snackbar.current.style.bottom = '-100px';
          }
        }.bind(Snackbar.snackbar),
        options.duration
      );
    }

    if (options.alertScreenReader) {
      Snackbar.snackbar.setAttribute('role', 'alert');
    }

    Snackbar.snackbar.addEventListener('transitionend', (event: any) => {
      if (
        event.propertyName === 'opacity' &&
        Snackbar.current.style.opacity === '0'
      ) {
        if (typeof options.onClose === 'function') options.onClose();
        // @ts-ignore
        Snackbar.current.parentElement.removeChild(Snackbar.current);
        if (Snackbar.current === Snackbar.current) {
          Snackbar.current = null;
        }
      }
    });

    Snackbar.current = Snackbar.snackbar;

    document.body.appendChild(Snackbar.snackbar);
    // let $bottom = getComputedStyle(Snackbar.snackbar).bottom;
    // let $top = getComputedStyle(Snackbar.snackbar).top;
    Snackbar.snackbar.style.opacity = '1';
    Snackbar.snackbar.className =
      'snackbar-container ' +
      options.customClass +
      ' snackbar-pos ' +
      options.pos;
  };

  Snackbar.close = function () {
    if (Snackbar.current) {
      Snackbar.current.style.opacity = 0;
    }
  };

  return Snackbar;
};

const showNotify = (settings: SnackbarSettings) => {
  const toast: ISnackbar = snackbar();
  if (settings) {
    return toast.show({
      ...settings,
      actionText: 'بستن',
      showAction: false,
      pos: 'bottom-center',
    });
  }
};
export default showNotify;

export const closeNotify = () => {
  const toast: ISnackbar = snackbar();
  return toast.close();
};
