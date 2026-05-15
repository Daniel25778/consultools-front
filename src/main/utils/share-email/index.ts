import { callToast } from 'main/utils/call-toast';

interface shareEmailProps {
  title: string;
  body: string;
}

export const shareEmail = (props: shareEmailProps): void => {
  const subject = encodeURIComponent(props.title);
  const { body } = props;
  const encodedBody = encodeURIComponent(body);

  const mainLink = `mailto:?subject=${subject}&body=${encodedBody}`;

  if (mainLink?.length > 1800)
    navigator.clipboard
      .writeText(body)
      .then(() => {
        const mailtoLink = `mailto:?subject=${subject}&body=O conteúdo foi copiado. Cole o texto aqui`;

        window.location.href = mailtoLink;
      })
      .catch((): void => {
        callToast.error('Falha ao abrir o e-mail');
      });
  else {
    const mailtoLink = `mailto:?subject=${subject}&body=${encodedBody}`;

    window.location.href = mailtoLink;
  }
};
