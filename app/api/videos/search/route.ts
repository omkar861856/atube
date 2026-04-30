export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const isVertical = searchParams.get('vertical') === 'true';
  const targetCount = Number(searchParams.get('count')) || (isVertical ? 3 : 20);
  
  let page = Number(searchParams.get('page')) || 1;
  const query = searchParams.get('query') || (isVertical ? 'vertical mobile' : 'amateur');

  try {
    if (isVertical) {
      let verticalVideos: any[] = [];
      let attempts = 0;
      let currentPage = page;

      // Fetch in batches until we find targetCount vertical videos
      while (verticalVideos.length < targetCount && attempts < 5) {
        const data = await searchVideos({
          query,
          per_page: 50,
          page: currentPage,
          order: 'most-popular',
        });

        if (!data.videos || data.videos.length === 0) break;

        const filtered = data.videos.filter(v => v.width < v.height);
        verticalVideos = [...verticalVideos, ...filtered];
        
        currentPage++;
        attempts++;
      }

      return NextResponse.json({
        videos: verticalVideos.slice(0, targetCount),
        nextPage: currentPage
      });
    }

    const data = await searchVideos({
      query,
      per_page: Number(searchParams.get('per_page')) || 20,
      page: page,
      order: (searchParams.get('order') as any) || 'most-popular',
    });
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch videos' }, { status: 500 });
  }
}
