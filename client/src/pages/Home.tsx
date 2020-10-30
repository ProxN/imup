import React, { useState, useCallback, memo } from 'react';
import axios from 'axios';
import { ReactComponent as UploadIcon } from '../assets/upload-icon.svg';
import {
  HomeContainer,
  HomeContent,
  UploadBox,
  SvgContainer,
  Label,
  SubText,
  UploadLoader,
  UploadProgress,
  PreviewContainer,
  ImagePreview,
  InputContainer,
  Input,
  CopyButton,
  GoBack,
} from './Home.styles';

interface IProgress {
  loaded: number;
  timeStamp: number;
  total: number;
}

interface IFile {
  fileId: string;
  filePath: string;
  fileType: string;
  height: number;
  name: string;
  size: number;
  thumbnailUrl: string;
  url: string;
  width: number;
}

interface IResponse {
  data: IFile;
  status: string;
}

interface IState {
  progress: number;
  uploading: boolean;
  file: IFile | null;
}

const Home: React.FC = () => {
  const [hightLight, setHightLight] = useState(false);
  const [copied, setCopied] = useState(false);
  const [state, setState] = useState<IState>({
    progress: 0,
    uploading: false,
    file: null,
  });

  const handleDragEnter = useCallback(
    (e: React.DragEvent<HTMLDivElement>): void => {
      e.preventDefault();
      e.stopPropagation();
      setHightLight(true);
    },
    [setHightLight]
  );

  const handleDragLeave = useCallback(
    (e: React.DragEvent<HTMLDivElement>): void => {
      e.preventDefault();
      e.stopPropagation();
      setHightLight(false);
    },
    [setHightLight]
  );

  const handleOndrop = async (
    event: React.DragEvent<HTMLDivElement>
  ): Promise<void> => {
    event.preventDefault();
    event.stopPropagation();
    setState({ ...state, uploading: true });
    const imageFile = event.dataTransfer.files[0];
    const url = 'http://localhost:5000/api/upload';
    const formData = new FormData();
    formData.append('image', imageFile);

    try {
      const res = await axios.post<IResponse>(url, formData, {
        onUploadProgress: (p: IProgress) => {
          setState({
            ...state,
            progress: (p.loaded * 100) / p.total,
            uploading: true,
          });
        },
      });

      if (res.data) {
        setState({ ...state, uploading: false, file: res.data.data });
      }
    } catch (err: any) {
      setState({ file: null, uploading: false, progress: 0 });
      setHightLight(false);
    }
  };

  const handleDragOver = useCallback(
    (event: React.DragEvent<HTMLDivElement>): void => {
      event.preventDefault();
      event.stopPropagation();
    },
    []
  );

  const ResetState = useCallback((): void => {
    setState({
      file: null,
      progress: 0,
      uploading: false,
    });
    setHightLight(false);
  }, []);

  const handleCopyClick = (): void => {
    if (state.file) {
      navigator.clipboard.writeText(state.file.url);
      setCopied(true);
    }
  };

  return (
    <HomeContainer>
      {state.uploading ? (
        <UploadLoader>
          <span>Uploading...</span>
          <UploadProgress progress={state.progress} />
        </UploadLoader>
      ) : (
        <HomeContent>
          {state.file ? (
            <PreviewContainer>
              <span>Uploaded Successfully!</span>
              <ImagePreview src={state.file.url} />
              <InputContainer>
                <Input
                  value={copied ? 'Copied to clipboard!!!' : state.file.url}
                />
                <CopyButton onClick={handleCopyClick}>Copy Link</CopyButton>
              </InputContainer>
              <GoBack onClick={ResetState}>Upload another image!</GoBack>
            </PreviewContainer>
          ) : (
            <UploadBox
              hightLight={hightLight}
              onDragLeave={handleDragLeave}
              onDragOver={handleDragOver}
              onDragEnter={handleDragEnter}
              onDrop={handleOndrop}
            >
              <SvgContainer>
                <UploadIcon />
              </SvgContainer>
              <Label>
                Drag & drop
                <span> images </span>
                here
              </Label>
              <SubText>
                or&nbsp;
                <span>browse files</span>
                &nbsp; on your computer
              </SubText>
            </UploadBox>
          )}
        </HomeContent>
      )}
    </HomeContainer>
  );
};

export default memo(Home);
