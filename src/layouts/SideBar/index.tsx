import { grayText } from '@/constant/color';
import { AnchorContext } from '@/hooks/useAnchor';
import { allTags } from '@/utils/tags';
import { Button, Paper, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import React, { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import { useLocalStorageState } from 'ahooks';

const SideBar: React.FC<{}> = () => {
  const { anchor } = useContext(AnchorContext);
  const [linkAnchor, setLinkAnchor] = useState(false);
  const [checkAnchor, setCheckAnchor] = useState('');
  const [, setScrollTop] = useLocalStorageState<number>('home_scrollTop', {
    defaultValue: 0,
  });

  useEffect(() => {
    if (linkAnchor) setLinkAnchor(false);
    else setCheckAnchor(anchor);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [anchor]);
  return (
    <Paper
      sx={{
        boxShadow:
          '0px 0px 2px 0px rgba(145,158,171,0.2), 0px 12px 24px -4px rgba(145,158,171,0.12)',
        borderRadius: '8px',
        width: '192px',
        height: '100%',
        overflow: 'auto',
        flexShrink: 0,
      }}
    >
      <Stack alignItems='center' sx={{ py: 1 }}>
        {allTags.map((item) => (
          <Link
            scroll={false}
            key={item.name}
            shallow
            onClick={() => {
              setCheckAnchor(item.name);
              setLinkAnchor(true);
              setScrollTop(undefined);
            }}
            href={'/#' + item.name}
            style={{ alignSelf: 'stretch' }}
            className='custom-link'
            prefetch
          >
            <Button
              sx={{
                pl: 3,
                height: '46px',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
              }}
            >
              <Image
                alt={item.label}
                src={checkAnchor === item.name ? item.icon_check : item.icon}
              />
              <Typography
                variant='subtitle2'
                fontFamily='PingFangSC'
                sx={{
                  color: grayText,
                  fontWeight: checkAnchor === item.name ? 900 : 400,
                  ml: 1,
                }}
              >
                {item.label}
              </Typography>
            </Button>
          </Link>
        ))}
      </Stack>
    </Paper>
  );
};

export default SideBar;
