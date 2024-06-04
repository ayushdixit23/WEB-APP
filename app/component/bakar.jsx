if (!mine) {
	return (
		<TouchableOpacity
			onLongPress={() => {
				dispatch(setshoulddelete(id));
				dispatch(setselectedmsgs(item?.mesId));
			}}
			onPress={() => {
				if (sec?.length > 0) {
					dispatch(setshoulddelete(id));
					dispatch(setselectedmsgs(item?.mesId));
				}
			}}
			style={{
				width: '100%',
				maxHeight: '100%',
				backgroundColor:
					(press?.appear && press?.index === i) || sec?.includes(item?.mesId)
						? theme
							? '#edf1f5f4'
							: '#1f1f1f'
						: null,
			}}>
			<TouchableOpacity
				onLongPress={() => {
					dispatch(setshoulddelete(id));
					dispatch(setselectedmsgs(item?.mesId));
				}}
				onPress={() => {
					if (sec?.length > 0) {
						dispatch(setshoulddelete(id));
						dispatch(setselectedmsgs(item?.mesId));
					}
				}}
				activeOpacity={0.8}
				style={{
					maxWidth: '100%',
					maxHeight: '100%',
					paddingHorizontal: 5,
					flexDirection: 'row',
					marginVertical: 8,
					marginHorizontal: 3,
				}}>
				{/Dp/}
				<View
					style={{
						justifyContent: 'center',
						alignItems: 'center',
						width: '10%',
						alignSelf: 'flex-start',
					}}>
					<FastImage
						style={{
							height: 35,
							width: 35,
							borderRadius: 15,
							marginHorizontal: 5,
						}}
						source={{
							uri: dp,
							priority: FastImage.priority.high,
						}}
						resizeMode={FastImage.resizeMode.cover}
					/>
					{item?.createdAt ? (
						<Text
							style={{
								color: theme ? textlight : textblack,
								fontSize: 10,
								fontWeight: '500',
								marginVertical: 4,
								alignSelf: 'center',
							}}>
							{moment(item?.createdAt).format('hh:mm')}
						</Text>
					) : null}
				</View>
				<View
					style={{
						maxWidth: '100%',
						maxHeight: '100%',
					}}>
					{/Text/}
					<View
						style={{
							maxWidth: '100%',
							marginHorizontal: 5,
						}}>
						<Text
							style={{
								color: theme ? black : white,
								fontSize: 12,
								fontWeight: '500',
								marginVertical: 5,
							}}>
							{''}
						</Text>

						{/* typing status */}
						{item?.typ === 'typing' ? (
							<View
								style={{
									maxHeight: '100%',
									maxWidth: '100%',
									backgroundColor: theme ? buttonlight : buttondark,
									borderTopRightRadius: 16,
									borderBottomEndRadius: 16,
									borderBottomStartRadius: 16,
									padding: 7,
									alignSelf: 'flex-start',
								}}>
								<LottieView
									source={require('../../../assets/typing.json')}
									autoPlay
									loop
									style={{ height: 20, width: 50 }}
								/>
							</View>
						) : null}

						{item?.status === 'active' ? (
							<View
								style={{
									maxHeight: '100%',
									maxWidth: '100%',
									backgroundColor:
										item?.typ === 'gif' ? null : theme ? msglight : msgdark,
									borderTopRightRadius: item?.typ === 'glimpse' ? 200 : 16,
									borderBottomEndRadius: item?.typ === 'glimpse' ? 200 : 16,
									borderBottomStartRadius: item?.typ === 'glimpse' ? 200 : 16,
									borderTopLeftRadius: item?.typ === 'glimpse' ? 200 : 0,
									padding: 7,
									alignSelf: 'flex-start',
									alignItems: 'flex-start',
									paddingHorizontal: 5,
								}}>
								{/reply/}
								{item?.typ === 'reply' ? (
									<TouchableOpacity
										onLongPress={() => {
											dispatch(setshoulddelete(id));
											dispatch(setselectedmsgs(item?.mesId));
										}}
										activeOpacity={0.7}
										onPress={() => {
											scrolltoIndex({ index: item?.replyId });
										}}
										style={{
											backgroundColor: theme ? white : black,
											maxHeight: '80%',
											maxWidth: '90%',
											borderRadius: 12,
											padding: 10,
											marginBottom: 2,
											alignSelf: 'flex-start',
										}}>
										<Text
											numberOfLines={2}
											style={{
												color: theme ? textlight : textblack,
												fontSize: 10,
												fontWeight: '500',
												maxWidth: '95%',
											}}>
											{item?.reply}
										</Text>
									</TouchableOpacity>
								) : null}

								<View
									style={{
										justifyContent: 'flex-start',
										alignItems: 'flex-start',
										alignSelf: 'flex-start',
									}}>
									<TouchableOpacity
										onLongPress={() => {
											dispatch(setshoulddelete(id));
											dispatch(setselectedmsgs(item?.mesId));
										}}
										disabled={loading}
										activeOpacity={0.7}
										onPress={() => {
											item?.typ === 'glimpse'
												? null
												: nav.navigate('ViewContent', {
													type: item?.typ,
													uri: item?.url,
													text: item?.text,
													name,
													isdownloaddable: true,
												});
										}}>
										{item?.typ === 'image' ||
											item?.typ === 'video' ||
											item?.typ === 'doc' ||
											item?.typ === 'gif' ||
											item?.typ === 'product' ||
											item?.typ === 'post' ? (
											<View
												style={{
													height:
														item?.typ === 'image' || item?.typ === 'video'
															? 220
															: item?.typ === 'gif'
																? 150
																: item?.typ === 'doc'
																	? 70
																	: 250,
													width:
														item?.typ === 'product' || item?.typ === 'post'
															? '100%'
															: item?.typ === 'image' ||
																item?.typ === 'video' ||
																item?.typ === 'doc'
																? 225
																: item?.typ === 'gif'
																	? 150
																	: 260,
												}}>
												{loading ? (
													<View
														style={{
															position: 'absolute',
															zIndex: 20,
															justifyContent: 'center',
															alignItems: 'center',
															height: '100%',
															width: '100%',
														}}>
														<View
															style={{
																height: '100%',
																width: '100%',
																position: 'absolute',
																backgroundColor: white,
																zIndex: 10,
																opacity: 0.4,
																borderRadius: 14,
															}}
														/>
														<ActivityIndicator
															size={'large'}
															color={theme ? black : black}
															style={{
																position: 'absolute',
																zIndex: 100,
															}}
														/>
													</View>
												) : null}

												{item?.typ === 'video' ? (
													<>
														<View
															style={{
																height: '100%',
																backgroundColor: theme
																	? modallight
																	: modaldark,
																width: '99%',
																borderRadius: 15,
															}}>
															<Video
																// fullscreenOrientation={'landscape'}
																source={{ uri: item?.url }}
																paused
																//controls
																//currentPlaybackTime
																resizeMode="contain"
																onBuffer={() => { }}
																onError={() => { }}
																style={{
																	height: '100%',
																	width: '100%',
																	borderRadius: 12,
																}}
															/>
														</View>
													</>
												) : item?.typ === 'image' || item?.typ === 'gif' ? (
													<>
														<View
															style={{
																height: '100%',
																backgroundColor:
																	item?.typ === 'image'
																		? theme
																			? modallight
																			: modaldark
																		: null,
																maxWidth: '99%',
																borderRadius: 15,
																justifyContent: 'flex-start',
																alignItems: 'flex-start',
															}}>
															<FastImage
																style={{
																	height: '100%',
																	borderRadius:
																		item?.typ === 'image' ? 15 : 0,
																	width: '100%',
																	alignSelf: 'flex-start',
																	justifyContent: 'flex-start',
																}}
																source={{
																	uri: item?.url,
																	priority: FastImage.priority.normal,
																}}
																resizeMode={
																	item?.typ === 'image'
																		? FastImage.resizeMode.cover
																		: FastImage.resizeMode.cover
																}
															/>
														</View>
													</>
												) : item?.typ === 'product' ||
													item?.typ === 'post' ? (
													<>
														<View
															style={{
																height: '100%',
																backgroundColor: theme ? msglight : msgdark,
																borderRadius: 15,
																width: 220,
																overflow: 'hidden',
															}}>
															<FastImage
																style={{
																	height: '100%',
																	borderRadius: 15,
																	width: '100%',
																}}
																source={{
																	uri: item?.url,
																	priority: FastImage.priority.normal,
																}}
																resizeMode={FastImage.resizeMode.contain}
															/>
														</View>
													</>
												) : item?.typ === 'doc' ? (
													<>
														<View
															style={{
																height: '100%',
																backgroundColor: theme
																	? modallight
																	: modaldark,
																width: '100%',
																borderRadius: 15,
																justifyContent: 'center',
																alignItems: 'center',
																paddingHorizontal: 10,
																flexDirection: 'row',
															}}>
															<View
																style={{
																	width: '20%',
																	height: '100%',
																	justifyContent: 'center',
																	alignItems: 'center',
																}}>
																<Ionicons
																	name="document"
																	size={30}
																	color={theme ? black : white}
																/>
															</View>
															<View
																style={{
																	justifyContent: 'center',
																	alignItems: 'flex-start',
																	width: '80%',
																	height: '100%',
																}}>
																<Text
																	style={{
																		fontSize: 11,
																		fontWeight: '700',
																		marginVertical: 3,
																		color: theme ? black : white,
																	}}>
																	{item?.content?.name}
																</Text>
																<Text
																	style={{
																		fontSize: 12,
																		fontWeight: '500',
																		color: white,
																	}}>
																	{size}
																</Text>
															</View>
														</View>
													</>
												) : null}
											</View>
										) : null}
										{item?.typ === 'glimpse' ? (
											<View
												style={{
													height: 200,
													width: 200,
													borderRadius: 200,
												}}>
												{play ? (
													<>
														{/pic until video loads/}
														{progress?.currentTime ? null : (
															<View
																style={{
																	position: 'absolute',
																	height: '100%',
																	width: '100%',
																	justifyContent: 'center',
																	alignItems: 'center',
																}}>
																<ActivityIndicator
																	size={'small'}
																	color={theme ? black : white}
																/>
																<FastImage
																	style={{
																		height: '100%',
																		borderRadius: 200,
																		width: '100%',
																		position: 'absolute',
																	}}
																	source={{
																		uri: item?.url,
																		priority: FastImage.priority.normal,
																	}}
																	resizeMode={FastImage.resizeMode.cover}
																/>
															</View>
														)}
														{!error ? (
															<>
																<Video
																	ref={videoref}
																	onProgress={x => {
																		setProgress(x);
																	}}
																	source={{ uri: item?.url }}
																	paused={false}
																	resizeMode="cover"
																	muted={true}
																	useTextureView={false}
																	onBuffer={b => {
																		console.log('Buffering', b);
																	}}
																	onEnd={() => {
																		setPlay(false);
																		if (videoref.current) {
																			videoref.current?.seek(0);
																		}
																	}}
																	onError={e => {
																		setError(e);
																		console.log(e, 'error playing video');
																	}}
																	style={{
																		height: '100%',
																		width: '100%',
																		borderRadius: 200,
																	}}
																/>
															</>
														) : (
															<View
																style={{
																	height: '100%',
																	width: '100%',
																	justifyContent: 'center',
																	alignItems: 'center',
																}}>
																<Text
																	style={{
																		color: white,
																		fontSize: 13,
																		fontWeight: '500',
																	}}>
																	Something went wrong...
																</Text>
															</View>
														)}
													</>
												) : (
													<FastImage
														style={{
															height: '100%',
															borderRadius: 200,
															width: '100%',
														}}
														source={{
															uri: item?.url,
															priority: FastImage.priority.normal,
														}}
														resizeMode={FastImage.resizeMode.cover}
													/>
												)}
												{/* Play pause the glimpse */}
												{play ? (
													<View
														style={{
															height: '100%',
															width: '100%',
															justifyContent: 'center',
															alignItems: 'center',
															position: 'absolute',
														}}>
														<TouchableOpacity
															activeOpacity={0.7}
															onPress={() => {
																setPlay(false);
															}}
															style={{
																height: 150,
																width: 150,
																justifyContent: 'center',
																alignItems: 'center',
															}}
														/>
													</View>
												) : (
													<View
														style={{
															height: '100%',
															width: '100%',
															justifyContent: 'center',
															alignItems: 'center',
															position: 'absolute',
														}}>
														<TouchableOpacity
															activeOpacity={0.7}
															onPress={() => {
																setPlay(true);
															}}
															style={{
																height: 50,
																width: 50,
																justifyContent: 'center',
																alignItems: 'center',
															}}>
															<Ionicons name="play" size={20} color={white} />
														</TouchableOpacity>
													</View>
												)}
											</View>
										) : null}
									</TouchableOpacity>
									{item?.text ? (
										<View
											style={{
												maxWidth: 220,
												marginHorizontal: 5,
												alignSelf: 'flex-start',
												marginVertical: 3,
												justifyContent: 'flex-start',
											}}>
											<Text>
												{parts?.map((part, index) => {
													const isUrl = part?.match(urlRegex);
													const maxLetters = 50;
													const truncateText = text => {
														if (text.length > maxLetters) {
															return text.slice(0, maxLetters) + '...';
														}
														return text;
													};
													return isUrl ? (
														<Text
															numberOfLines={1}
															key={index}
															onPress={() => handlePress(part)}
															style={{
																color: bluelight,
																textDecorationLine: 'underline',
																fontSize: 12,
																fontWeight: '500',
																lineHeight: 20,
															}}>
															{part}
														</Text>
													) : (
														<Text
															key={index}
															style={{
																color: theme ? black : white,
																fontSize: 12,
																fontWeight: '400',
																lineHeight: 20,
																alignSelf: 'flex-start',
																maxWidth: '100%',
															}}>
															{part}
														</Text>
													);
												})}
											</Text>
										</View>
									) : null}

									{item?.typ === 'product' || item?.typ === 'post' ? (
										<TouchableOpacity
											activeOpacity={0.7}
											onPress={() => {
												if (item?.typ === 'post') {
													nav.navigate('CommunityChat', {
														id,
														comId: item?.comId,
														postId: item?.forwardid,
													});
												} else {
													nav.navigate('ProductPage', {
														id,
														productId: item?.forwardid,
														//check: item?.cartId,
														myid,
														// fullname,
														//pic,
													});
												}
											}}
											style={{
												height: 40,
												width: 220,
												backgroundColor: theme ? white : modaldark,
												borderRadius: 14,
												justifyContent: 'center',
												alignItems: 'center',
												alignSelf: 'center',
											}}>
											<Text
												style={{
													color: theme ? black : white,
													fontSize: 14,
													fontWeight: '500',
												}}>
												{item?.typ === 'post' ? 'View post' : 'View Product'}
											</Text>
										</TouchableOpacity>
									) : null}
								</View>
							</View>
						) : item?.status === 'deleted' ? (
							<View
								style={{
									maxHeight: '100%',
									maxWidth: '100%',
									backgroundColor: theme ? buttonlight : buttondark,
									borderTopRightRadius: 16,
									borderBottomEndRadius: 16,
									borderBottomStartRadius: 16,
									padding: 7,
									alignSelf: 'flex-start',
								}}>
								<View>
									<View style={{ width: '100%', marginHorizontal: 5 }}>
										<Text
											style={{
												color: theme ? black : white,
												fontSize: 12,
												fontWeight: '500',
												lineHeight: 20,
												alignSelf: 'flex-start',
												fontStyle: 'italic',
											}}>
											This Message was Deleted!
										</Text>
									</View>
								</View>
							</View>
						) : null}
					</View>
				</View>
			</TouchableOpacity>
		</TouchableOpacity>
	);
}
//right
else {
	return (
		<TouchableOpacity
			activeOpacity={0.8}
			onLongPress={() => {
				dispatch(setshoulddelete(item?.status === 'deleted' ? id : myid));
				dispatch(setselectedmsgs(item?.mesId));
			}}
			onPress={() => {
				if (sec?.length > 0) {
					dispatch(setshoulddelete(item?.status === 'deleted' ? id : myid));
					dispatch(setselectedmsgs(item?.mesId));
				}
			}}
			style={{
				width: '100%',
				maxHeight: '100%',
				backgroundColor:
					(press?.appear && press?.index === i) || sec?.includes(item?.mesId)
						? theme
							? '#edf1f5f4'
							: '#1f1f1f'
						: null,
			}}>
			<TouchableOpacity
				onLongPress={() => {
					dispatch(setshoulddelete(item?.status === 'deleted' ? id : myid));
					dispatch(setselectedmsgs(item?.mesId));
				}}
				onPress={() => {
					if (sec?.length > 0) {
						dispatch(setshoulddelete(item?.status === 'deleted' ? id : myid));
						dispatch(setselectedmsgs(item?.mesId));
					}
				}}
				activeOpacity={0.8}
				style={{
					maxWidth: '100%',
					maxHeight: '100%',
					paddingHorizontal: 5,
					flexDirection: 'row',
					marginVertical: 10,
					alignSelf: 'flex-end',
					marginHorizontal: 3,
				}}>
				<View
					style={{
						maxWidth: '100%',
						maxHeight: '100%',
					}}>
					{/Text/}
					<View
						style={{
							maxWidth: '100%',
							marginHorizontal: 5,
							maxHeight: '100%',
						}}>
						<Text
							style={{
								color: theme ? black : white,
								fontSize: 10,
								fontWeight: '500',
								marginVertical: 5,
								alignSelf: 'flex-end',
							}}>
							{''}
						</Text>
						{item?.status === 'active' ? (
							<View
								style={{
									maxHeight: '100%',
									maxWidth: '100%',
									backgroundColor:
										item?.typ === 'gif' ? null : theme ? bluelight : bluedark,
									borderTopLeftRadius: item?.typ === 'glimpse' ? 200 : 16,
									borderBottomEndRadius: item?.typ === 'glimpse' ? 200 : 16,
									borderBottomStartRadius: item?.typ === 'glimpse' ? 200 : 16,
									borderTopRightRadius: item?.typ === 'glimpse' ? 200 : 0,
									padding: 5,
									alignSelf: 'flex-end',
									alignItems: 'center',
									paddingHorizontal: 5,
								}}>
								{/reply/}
								{item?.typ === 'reply' ? (
									<TouchableOpacity
										onLongPress={() => {
											dispatch(
												setshoulddelete(
													item?.status === 'deleted' ? id : myid,
												),
											);
											dispatch(setselectedmsgs(item?.mesId));
										}}
										activeOpacity={0.7}
										onPress={() => {
											dispatch(
												setshoulddelete(
													item?.status === 'deleted' ? id : myid,
												),
											);
											scrolltoIndex({ index: item?.replyId });
										}}
										style={{
											backgroundColor: theme ? buttonlight : buttondark,
											maxHeight: '80%',
											maxWidth: '90%',
											borderRadius: 12,
											padding: 10,
											marginBottom: 2,
											alignSelf: 'flex-start',
										}}>
										<Text
											numberOfLines={2}
											style={{
												color: theme ? textlight : textblack,
												fontSize: 10,
												fontWeight: '500',
												maxWidth: '95%',
											}}>
											{item?.reply}
										</Text>
									</TouchableOpacity>
								) : null}

								<View
									style={{
										justifyContent: 'flex-start',
										alignItems: 'flex-start',
										alignSelf: 'flex-start',
									}}>
									<TouchableOpacity
										disabled={loading}
										activeOpacity={0.7}
										onLongPress={() => {
											dispatch(
												setshoulddelete(
													item?.status === 'deleted' ? id : myid,
												),
											);
											dispatch(setselectedmsgs(item?.mesId));
										}}
										onPress={() => {
											item?.typ === 'glimpse'
												? null
												: nav.navigate('ViewContent', {
													type: item?.typ,
													uri: item?.url,
													text: item?.text,
													name,
													isdownloaddable: false,
												});
										}}>
										{item?.typ === 'image' ||
											item?.typ === 'video' ||
											item?.typ === 'doc' ||
											item?.typ === 'gif' ||
											item?.typ === 'product' ||
											item?.typ === 'post' ? (
											<View
												style={{
													height:
														item?.typ === 'image' || item?.typ === 'video'
															? 220
															: item?.typ === 'gif'
																? 150
																: item?.typ === 'doc'
																	? 70
																	: 250,
													width:
														item?.typ === 'product' || item?.typ === 'post'
															? '100%'
															: item?.typ === 'image' ||
																item?.typ === 'video' ||
																item?.typ === 'doc'
																? 225
																: item?.typ === 'gif'
																	? 150
																	: 260,
													//padding: 5,
													alignItems: 'center',
												}}>
												{loading ? (
													<View
														style={{
															position: 'absolute',
															zIndex: 20,
															justifyContent: 'center',
															alignItems: 'center',
															height: '100%',
															width: '100%',
														}}>
														<View
															style={{
																height: '100%',
																width: '100%',
																position: 'absolute',
																backgroundColor: white,
																zIndex: 10,
																opacity: 0.4,
																borderRadius: 14,
															}}
														/>
														<ActivityIndicator
															size={'large'}
															color={theme ? black : black}
															style={{
																position: 'absolute',
																zIndex: 100,
															}}
														/>
													</View>
												) : null}

												{item?.typ === 'video' ? (
													<>
														<View
															style={{
																height: '100%',
																backgroundColor: theme
																	? modallight
																	: modaldark,
																width: '99%',
																borderRadius: 15,
															}}>
															<Video
																// fullscreenOrientation={'landscape'}
																source={{ uri: item?.url }}
																paused
																// controls
																//currentPlaybackTime
																resizeMode="contain"
																onBuffer={() => { }}
																onError={() => { }}
																style={{
																	height: '100%',
																	width: '100%',
																	borderRadius: 12,
																}}
															/>
														</View>
													</>
												) : item?.typ === 'image' || item?.typ === 'gif' ? (
													<>
														<View
															style={{
																height: '100%',
																backgroundColor:
																	item?.typ === 'image'
																		? theme
																			? modallight
																			: modaldark
																		: null,
																borderRadius: 15,
																width: '99%',
																alignSelf:
																	item?.typ === 'image' ? null : 'flex-end',
															}}>
															<FastImage
																style={{
																	height: '100%',
																	borderRadius:
																		item?.typ === 'image' ? 15 : 0,
																	width: '100%',
																	alignSelf: 'flex-end',
																}}
																source={{
																	uri: item?.url,
																	priority: FastImage.priority.normal,
																}}
																resizeMode={
																	item?.typ === 'image'
																		? FastImage.resizeMode.cover
																		: FastImage.resizeMode.cover
																}
															/>
														</View>
													</>
												) : item?.typ === 'product' ||
													item?.typ === 'post' ? (
													<>
														<View
															style={{
																height: '100%',
																backgroundColor: theme
																	? modallight
																	: modaldark,
																borderRadius: 15,
																width: 220,
																overflow: 'hidden',
															}}>
															<FastImage
																style={{
																	height: '100%',
																	borderRadius: 15,
																	width: '100%',
																}}
																source={{
																	uri: item?.url,
																	priority: FastImage.priority.normal,
																}}
																resizeMode={FastImage.resizeMode.cover}
															/>
														</View>
													</>
												) : item?.typ === 'doc' ? (
													<>
														<View
															style={{
																height: '100%',
																backgroundColor: theme
																	? modallight
																	: modaldark,
																width: '100%',
																borderRadius: 15,
																justifyContent: 'center',
																alignItems: 'center',
																paddingHorizontal: 10,
																flexDirection: 'row',
															}}>
															<View
																style={{
																	width: '20%',
																	height: '100%',
																	justifyContent: 'center',
																	alignItems: 'center',
																}}>
																<Ionicons
																	name="document"
																	size={30}
																	color={theme ? black : white}
																/>
															</View>

															<View
																style={{
																	justifyContent: 'center',
																	alignItems: 'flex-start',
																	width: '80%',
																	height: '100%',
																}}>
																<Text
																	numberOfLines={1}
																	style={{
																		fontSize: 11,
																		fontWeight: '700',
																		marginVertical: 3,
																		color: theme ? black : white,
																	}}>
																	{item?.content?.name}
																</Text>
																<Text
																	style={{
																		fontSize: 12,
																		fontWeight: '500',
																		color: theme ? black : white,
																	}}>
																	{size}
																</Text>
															</View>
														</View>
													</>
												) : null}
											</View>
										) : null}
									</TouchableOpacity>
									{item?.typ === 'glimpse' ? (
										<View
											style={{
												height: 200,
												width: 200,
												borderRadius: 2000,
												overflow: 'hidden',
												justifyContent: 'center',
												alignItems: 'center',
												alignSelf: 'center',
												marginHorizontal: 5,
											}}>
											{play ? (
												<>
													{/pic until video loads/}
													{progress?.currentTime ? null : (
														<View
															style={{
																position: 'absolute',
																height: '100%',
																width: '100%',
																justifyContent: 'center',
																alignItems: 'center',
																borderRadius: 200,
																overflow: 'hidden',
															}}>
															<ActivityIndicator
																size={'small'}
																color={theme ? black : white}
															/>
															<FastImage
																style={{
																	height: '100%',
																	borderRadius: 200,
																	width: '100%',
																	position: 'absolute',
																}}
																source={{
																	uri: item?.url,
																	priority: FastImage.priority.normal,
																}}
																resizeMode={FastImage.resizeMode.cover}
															/>
														</View>
													)}
													{!error ? (
														<>
															<Video
																ref={videoref}
																source={{ uri: item?.url }}
																onProgress={x => {
																	setProgress(x);
																}}
																paused={false}
																resizeMode="cover"
																muted={true}
																useTextureView={false}
																onBuffer={b => {
																	console.log('Buffering', b);
																}}
																onEnd={() => {
																	setPlay(false);
																	if (videoref.current) {
																		videoref.current?.seek(0);
																	}
																}}
																onError={e => {
																	setError(e);
																	console.log(e, 'error playing video');
																}}
																style={{
																	height: '100%',
																	width: '100%',
																	borderRadius: 200,
																}}
															/>
														</>
													) : (
														<View
															style={{
																height: '100%',
																width: '100%',
																justifyContent: 'center',
																alignItems: 'center',
																borderRadius: 200,
															}}>
															<Text
																style={{
																	color: white,
																	fontSize: 13,
																	fontWeight: '500',
																}}>
																Something went wrong...
															</Text>
														</View>
													)}
												</>
											) : (
												<View
													style={{
														height: 200,
														width: 200,
														borderRadius: 200,
														overflow: 'hidden',
														justifyContent: 'center',
														alignItems: 'center',
														alignSelf: 'center',
													}}>
													<FastImage
														style={{
															height: '100%',
															borderRadius: 200,
															width: '100%',
														}}
														source={{
															uri: item?.url,
															priority: FastImage.priority.normal,
														}}
														resizeMode={FastImage.resizeMode.cover}
													/>
												</View>
											)}
											{/* Play pause the glimpse */}
											{play ? (
												<View
													style={{
														height: '100%',
														width: '100%',
														justifyContent: 'center',
														alignItems: 'center',
														position: 'absolute',
														borderRadius: 200,
														overflow: 'hidden',
													}}>
													<TouchableOpacity
														activeOpacity={0.7}
														onPress={() => {
															setPlay(false);
														}}
														style={{
															height: 150,
															width: 150,
															justifyContent: 'center',
															alignItems: 'center',
														}}
													/>
												</View>
											) : (
												<View
													style={{
														height: '100%',
														width: '100%',
														justifyContent: 'center',
														alignItems: 'center',
														position: 'absolute',
														borderRadius: 200,
														overflow: 'hidden',
													}}>
													<TouchableOpacity
														activeOpacity={0.7}
														onPress={() => {
															setPlay(true);
														}}
														style={{
															height: 50,
															width: 50,
															justifyContent: 'center',
															alignItems: 'center',
														}}>
														<Ionicons name="play" size={20} color={white} />
													</TouchableOpacity>
												</View>
											)}
										</View>
									) : null}

									{item?.text ? (
										<View
											style={{
												maxWidth: 220,
												marginHorizontal: 5,
												alignSelf: 'flex-start',
												marginVertical: 3,
												justifyContent: 'flex-start',
											}}>
											<Text>
												{parts?.map((part, index) => {
													const isUrl = part?.match(urlRegex);
													const maxLetters = 50;
													const truncateText = text => {
														if (text.length > maxLetters) {
															return text.slice(0, maxLetters) + '...';
														}
														return text;
													};
													return isUrl ? (
														<Text
															key={index}
															onPress={() => handlePress(part)}
															style={{
																color: white,
																textDecorationLine: 'underline',
																fontSize: 12,
																fontWeight: '500',
																lineHeight: 20,
															}}>
															{part}
														</Text>
													) : (
														<Text
															key={index}
															style={{
																color: 'white',
																fontSize: 12,
																fontWeight: '500',
																lineHeight: 20,
																alignSelf: 'flex-start',
															}}>
															{part}
														</Text>
													);
												})}
											</Text>
										</View>
									) : null}
									{item?.typ === 'product' || item?.typ === 'post' ? (
										<TouchableOpacity
											activeOpacity={0.7}
											onPress={() => {
												if (item?.typ === 'post') {
													nav.navigate('CommunityChat', {
														id,
														comId: item?.comId,
														postId: item?.forwardid,
													});
												} else {
													nav.navigate('ProductPage', {
														id,
														productId: item?.forwardid,
														//check: item?.cartId,
														myid,
														// fullname,
														//pic,
													});
												}
											}}
											style={{
												height: 40,
												width: 220,
												backgroundColor: theme ? modallight : modaldark,
												borderRadius: 14,
												justifyContent: 'center',
												alignItems: 'center',
												//marginVertical: 5,
												alignSelf: 'center',
											}}>
											<Text
												style={{
													color: theme ? black : white,
													fontSize: 14,
													fontWeight: '500',
												}}>
												{item?.typ === 'post' ? 'View post' : 'View Product'}
											</Text>
										</TouchableOpacity>
									) : null}
								</View>
							</View>
						) : item?.status === 'deleted' ? (
							<View
								style={{
									maxHeight: '100%',
									maxWidth: '95%',
									backgroundColor: theme ? bluelight : bluedark,
									borderTopLeftRadius: 16,
									borderBottomEndRadius: 16,
									borderBottomStartRadius: 16,
									padding: 7,
									alignSelf: 'flex-end',
								}}>
								<View>
									<View
										style={{
											width: '100%',
											marginHorizontal: 5,
											marginRight: 10,
										}}>
										<Text
											style={{
												color: 'white',
												fontSize: 12,
												fontWeight: '500',
												lineHeight: 20,
												alignSelf: 'flex-start',
												fontStyle: 'italic',
											}}>
											This Message was Deleted!
										</Text>
									</View>
								</View>
							</View>
						) : null}
					</View>
				</View>

				{/Dp/}
				<View
					style={{
						justifyContent: 'center',
						alignItems: 'center',
						alignSelf: 'flex-start',
						width: '10%',
					}}>
					{/* seen/unseen */}
					{read ? null : (
						<View
							style={{
								height: 30,
								width: 30,
								backgroundColor: 'rgba(0,0,0,0.5)',
								zIndex: 10,
								position: 'absolute',
								borderRadius: 12,
								bottom: 22,
							}}
						/>
					)}
					<FastImage
						style={{
							height: read ? 35 : 30,
							width: read ? 35 : 30,
							borderRadius: read ? 15 : 12,
							marginHorizontal: read ? 5 : 2,
						}}
						source={{
							uri: mypic,
							priority: FastImage.priority.high,
						}}
						resizeMode={FastImage.resizeMode.cover}
					/>
					<Text
						style={{
							color: theme ? textlight : textblack,
							fontSize: 10,
							fontWeight: '500',
							marginVertical: 4,
							alignSelf: 'center',
						}}>
						{moment(item?.createdAt).format('hh:mm')}
					</Text>
				</View>
			</TouchableOpacity>
		</TouchableOpacity>
	);
}