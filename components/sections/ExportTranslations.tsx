import { Fragment, InputHTMLAttributes, LabelHTMLAttributes, useState } from 'react';
import { Button } from '../basecomponents/Button';
import { Translation } from '../basecomponents/TranslationContainer';
import { Modal } from '../basecomponents/Modal';
import Link from 'next/link';

const PREVIEW_PHRASES_COUNT = 3;
const CUSTOM_SEPARATOR_MAX_LENGTH = 30;

interface ExportTranslationsProps {
  translations: Translation[];
  category: string;
}

interface SeparatorOption {
  id: string;
  name: string;
  value: string;
  displayValue?: JSX.Element;
}

const TRANSLATION_SEPARATORS: SeparatorOption[] = [
  { id: 'transl_comma', name: 'comma', value: ', ' },
  { id: 'transl_semicolor', name: 'semicolon', value: '; ' },
  { id: 'trans_tab', name: 'tab', value: '\t', displayValue: <span>(&nbsp;&nbsp;&nbsp;&nbsp;)</span> },
];
const TRANS_SEP_CUSTOM = 'trans_custom';

const PHRASE_SEPARATORS: SeparatorOption[] = [
  { id: 'phrase_newLine', name: 'new line', value: '\n', displayValue: <span></span> },
  { id: 'phrase_semicolor', name: 'semicolon', value: '; ' },
];
const PHRASE_SEP_CUSTOM = 'phrase_custom';

const unescapeTabsAndNewlines = (str: string) => str.replace(/\\n/g, '\n').replace(/\\t/g, '\t');

const RadioButton = ({ ...props }: InputHTMLAttributes<HTMLInputElement>) => (
  <input type="radio" className="ml-3 inline-block my-2 cursor-pointer" {...props} />
);
const Label = ({ ...props }: LabelHTMLAttributes<HTMLLabelElement>) => <label className="pl-3 cursor-pointer" {...props} />;
const TextInput = ({ ...props }: InputHTMLAttributes<HTMLInputElement>) => (
  <input
    type="text"
    maxLength={CUSTOM_SEPARATOR_MAX_LENGTH}
    className="rounded-md md:rounded-lg w-24 max-w-full px-2 text-dark-700 border-1 border-primary-blue outline-none shadow-s"
    {...props}
  />
);
const Separator = () => (
  <div className="pb-2">
    <div className="w-full border-t border-gray-300"></div>
  </div>
);

export const ExportTranslations = ({ translations, category }: ExportTranslationsProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [translationSeparator, setTranslationSeparator] = useState(TRANSLATION_SEPARATORS[0].value);
  const [customTranslationSeparator, setCustomTranslationSeparator] = useState(' - ');
  const [phraseSeparator, setPhraseSeparator] = useState(PHRASE_SEPARATORS[0].value);
  const [customPhraseSeparator, setCustomPhraseSeparator] = useState('\\n\\n');

  const translSep = translationSeparator === TRANS_SEP_CUSTOM ? customTranslationSeparator : translationSeparator;
  const phraseSep = phraseSeparator === PHRASE_SEP_CUSTOM ? customPhraseSeparator : phraseSeparator;
  const phrases = translations
    .map((translation) => `${translation.cz_translation}${translSep}${translation.ua_translation}${phraseSep}`)
    .map((translation) => unescapeTabsAndNewlines(translation));

  const data = new Blob(phrases, { type: 'text/plain' });
  const downloadLink = window.URL.createObjectURL(data);
  const fileName = `${category}.txt`;

  return (
    <>
      <span onClick={() => setIsModalOpen(true)} className="cursor-pointer underline text-primary-blue ml-4 pb-4 inline-block">
        Download phrases
      </span>
      <Modal closeModal={() => setIsModalOpen(false)} isOpen={isModalOpen} title={'Download phrases'}>
        <div className="grid grid-cols-1 sm:grid-cols-2">
          <div>
            <h3 className="my-4">Between phrase and translation:</h3>
            {TRANSLATION_SEPARATORS.map((option) => (
              <>
                <RadioButton
                  id={option.id}
                  name={'translationSeparator'}
                  value={option.value}
                  checked={translationSeparator === option.value}
                  onChange={() => setTranslationSeparator(option.value)}
                />
                <Label htmlFor={option.id}>
                  {option.name} {option.displayValue ?? `(${option.value})`}
                </Label>
                <br />
              </>
            ))}
            <RadioButton
              id={TRANS_SEP_CUSTOM}
              name={'translationSeparator'}
              value={TRANS_SEP_CUSTOM}
              checked={translationSeparator === TRANS_SEP_CUSTOM}
              onChange={() => setTranslationSeparator(TRANS_SEP_CUSTOM)}
            />
            <Label htmlFor={TRANS_SEP_CUSTOM}>
              Custom
              {translationSeparator === TRANS_SEP_CUSTOM && (
                <>
                  <span>:&nbsp;&nbsp;&nbsp;</span>
                  <TextInput value={customTranslationSeparator} onChange={(e) => setCustomTranslationSeparator(e.target.value)} />
                </>
              )}
            </Label>
          </div>
          <div>
            <h3 className="my-4">Between phrases:</h3>
            {PHRASE_SEPARATORS.map((option) => (
              <>
                <RadioButton
                  id={option.id}
                  name={'phraseSeparator'}
                  value={option.value}
                  checked={phraseSeparator === option.value}
                  onChange={() => setPhraseSeparator(option.value)}
                />
                <Label htmlFor={option.id}>
                  {option.name} {option.displayValue ?? `(${option.value})`}
                </Label>
                <br />
              </>
            ))}
            <RadioButton
              id={PHRASE_SEP_CUSTOM}
              name={'phraseSeparator'}
              value={PHRASE_SEP_CUSTOM}
              checked={phraseSeparator === PHRASE_SEP_CUSTOM}
              onChange={() => setPhraseSeparator(PHRASE_SEP_CUSTOM)}
            />
            <Label htmlFor={PHRASE_SEP_CUSTOM}>
              Custom
              {phraseSeparator === PHRASE_SEP_CUSTOM && (
                <>
                  <span>:&nbsp;&nbsp;&nbsp;</span>
                  <TextInput value={customPhraseSeparator} onChange={(e) => setCustomPhraseSeparator(e.target.value)} />
                </>
              )}
            </Label>
            <br />
          </div>
        </div>

        <h3 className="my-4">Preview:</h3>
        <div className="bg-gray-100 border-1 border-gray-400 p-2">
          <code className="whitespace-pre-wrap">{phrases.slice(0, PREVIEW_PHRASES_COUNT)}</code>
        </div>

        <div className="flex justify-center">
          <a download={fileName} href={downloadLink}>
            <Button text="Download phrases" className="my-6" />
          </a>
        </div>
        <Separator />
        <div className="text-sm font-light">
          Obsah můžete pro své učely používat zdarma a bez omezení, šířit ho dál můžete jen za podmínek licence&nbsp;
          <Link href={'https://creativecommons.org/licenses/by-nc/4.0/deed.cs'}>
            <a target={'_blank'} className="underline">
              CC BY-NC 4.0
            </a>
          </Link>
        </div>
      </Modal>
    </>
  );
};