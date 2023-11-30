import './EditButton.css';
import edit_icon from '../../assets/svgs/edit-icon.svg';
import { useRef } from 'react';

export default function EditButton({ onClick, position = 'relative', width = '25px', height = '25px', right, bottom, input = false, photo, setPhoto }) {
  const fileInputRef = useRef(null);

  const InputClickPhoto = () => {
    fileInputRef.current.click();
  };

  const InputChangePhoto = (e) => {
    const selectedFile = e.target.files[0];

    // Atualiza o estado setPhoto com o arquivo selecionado
    setPhoto(selectedFile);

    // Se desejar, você também pode armazenar ou exibir informações sobre o arquivo
    // console.log('Nome do arquivo:', selectedFile ? selectedFile.name : 'Nenhum arquivo selecionado');
    // console.log('Tipo do arquivo:', selectedFile ? selectedFile.type : 'Nenhum arquivo selecionado');
    // console.log('Tamanho do arquivo:', selectedFile ? selectedFile.size : 'Nenhum arquivo selecionado');
  };

  return (
    <>
      <main id="main-EditButton" onClick={input ? InputClickPhoto : onClick} style={{ width: width, height: height, position: position, right: right, bottom: bottom }}>
        <img src={edit_icon} alt="" style={{ width: width, height: height }} />
      </main>
      {input && <input onClick={InputClickPhoto} onChange={InputChangePhoto} ref={fileInputRef} type="file" id="fileInput" accept="image/*" style={{ width: 100, height: 100, position: 'absolute', display: 'none' }} />}
    </>
  );
}
