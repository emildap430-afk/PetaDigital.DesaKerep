export interface ShareData {
  title: string;
  text: string;
  url?: string;
}

export const shareContent = async (data: ShareData): Promise<{ success: boolean; copied?: boolean }> => {
  const shareUrl = data.url || (typeof window !== 'undefined' ? window.location.href : '');

  if (typeof navigator !== 'undefined' && navigator.share) {
    try {
      await navigator.share({
        title: data.title,
        text: data.text,
        url: shareUrl
      });
      return { success: true };
    } catch (err) {
      console.log('Web share cancelled or error:', err);
    }
  }

  // Fallback to clipboard
  try {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      await navigator.clipboard.writeText(`${data.title}\n${data.text}\n${shareUrl}`);
      return { success: true, copied: true };
    }
    return { success: false };
  } catch (err) {
    console.error('Failed to copy to clipboard:', err);
    return { success: false };
  }
};
